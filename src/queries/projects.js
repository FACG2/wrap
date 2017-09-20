const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');

//
// const getTasksByUserName = (userName, cb) => {
//   const sql = {
//     text: `SELECT project_id FROM user_project WHERE assigned = $1`,
//     values: [userName] };
//
//   connection.query(sql, (err, res) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, res);
//     }
//   });
// };

const getTasksByUserId = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE user_id= $1`,
    values: [userId] };
    // `SELECT * FROM tasks INNER JOIN users ON users.username = tasks.assigned WHERE users.id= $1`,

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getCurrentProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = ${userId} AND projects.finished= false`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getFinishedProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = ${userId} AND projects.finished= true`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const FilterByPriority = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE user_id= $1 ORDER BY priority ASC `,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};
