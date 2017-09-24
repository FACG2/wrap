const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');

const getTasksByUserId = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE assigned_id= $1`,
    values: [userId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getTasksByState = (sprintId, state, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE sprint_id= $1 AND state = $2`,
    values: [sprintId, state] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getStateByName = (stateName, cb) => {
  const sql = {
    text: `SELECT id FROM state WHERE name= $1`,
    values: [stateName] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0].id);
    }
  });
};

const getProjectTasks = (projectId, state, cb) => {
  getStateByName(state, (error, stateId) => {
    if (error) {
      cb(error);
    } else {
      const sql = {
        text: `SELECT * FROM tasks WHERE project_id= $1 AND state_id=$2`,
        values: [projectId, stateId] };
      connection.query(sql, (err, res) => {
        if (err) {
          cb(err);
        } else {
          cb(null, res.rows);
        }
      });
    }
  });
};

const getCurrentTasks = (userId, cb) => {
  const sql = {
    text: `SELECT tasks.title,tasks.id,tasks.deadline,tasks.description,tasks.duration,tasks.priority,tasks.progress FROM tasks INNER JOIN state ON tasks.state_id=state.id WHERE tasks.assigned_id= $1 AND state.name != 'done'`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

// / get the current tasks orderd by priority
const filterByPriority = (userId, cb) => {
  const sql = {
    text: `SELECT tasks.title,tasks.id,tasks.deadline,tasks.description,tasks.duration,tasks.priority,tasks.progress FROM tasks INNER JOIN state ON tasks.state_id=state.id WHERE tasks.assigned_id= $1 AND state.name != 'done' ORDER BY tasks.priority ASC `,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const comment = (userId, context, taskId, cb) => {
  const sql = {
    text: `INSERT INTO comments (user_id,context,task_id) VALUES ($1,$2,$3) RETURNING *`,
    values: [userId, context, taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

const deleteComment = (commentId, cb) => {
  const sql = {
    text: `DELETE FROM comments WHERE comments.id=$1`,
    values: [commentId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const listComments = (taskId, cb) => {
  const sql = {
    text: `SELECT * FROM comments WHERE task_id=$1 `,
    values: [taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

module.exports = {
  getCurrentTasks,
  getTasksByUserId,
  filterByPriority,
  comment,
  deleteComment,
  listComments
};
