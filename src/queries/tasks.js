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
      cb(null, res);
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
      cb(null, res);
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
      cb(null, res);
    }
  });
};

// ////

const calTaskOrder = (projectId, cb) => {
  getProjectTasks(projectId, 'backlog', (err, tasks) => {
    if (err) {
      cb(err);
    } else {
      cb(null, tasks[tasks.length - 1].orders + 1);
    }
  });
};

const addTask = (title, description, priority, deadline, duration, projectId, cb) => {
  calTaskOrder(projectId, (error, order) => {
    if (error) {
      cb(error);
    } else {
      getStateByName('backlog', (err, state_id) => {
        if (err) {
          cb(err);
        } else {
          const sql = {
            text: `INSERT INTO tasks (title,description,priority,deadline,duration,project_id,state_id,orders) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            values: [title, description, priority, deadline, duration, projectId, state_id, order] };
          connection.query(sql, (err, res) => {
            if (err) {
              cb(err);
            } else {
              cb(null, res.rows);
            }
          });
        }
      });
    }
  });
};

module.exports = {
  getCurrentTasks,
  getTasksByUserId,
  filterByPriority
};
