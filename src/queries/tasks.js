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
    text: `SELECT * FROM tasks WHERE assigned_id= $1 AND state != 'done'`,
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
    text: `SELECT * FROM tasks WHERE assigned_id= $1 AND state != 'done' ORDER BY priority ASC `,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  getCurrentTasks,
  getTasksByUserId,
  filterByPriority
};
