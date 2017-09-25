const connection = require('../database/db_connection.js');
require('env2')('./config.env');

const addLog = (projectId, username, context, type, link, actionId, cb) => {
  const sql = {
    text: `INSERT INTO logs (project_id, username, context, type, link, action_id) VALUES ($1,$2,$3,$4,$5,$6)`,
    values: [projectId, username, context, type, link, actionId]
  };
  connection.query(sql, cb);
};

module.exports = {
  addLog
};
