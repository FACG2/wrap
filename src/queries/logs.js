const connection = require('../database/db_connection.js');
require('env2')('./config.env');

const addLog = (projectId, username, context, type, link, actionId, cb) => {
  const sql = {
    text: `INSERT INTO logs (project_id, username, context, type, link, action_id) VALUES ($1,$2,$3,$4,$5,$6)`,
    values: [projectId, username, context, type, link, actionId]
  };
  connection.query(sql, cb);
};

const viewLogs = (projectId, cb) => {
  const sql = {
    text: `SELECT username,context,link,mdate  FROM logs WHERE project_id=$1`,
    values: [projectId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  addLog,
  viewLogs
};
