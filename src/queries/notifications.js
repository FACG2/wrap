const connection = require('../database/db_connection.js');

const addNotification = (userId, context, link, cb) => {
  const sql = {
    text: `INSERT INTO notifications WHERE user_id=$1`,
    values: [userId]
  };
  connection.query(sql, cb);
};

const addWatchersNotification = (userId, projectId, context, link, cb) => {
  const sql = {
// //////////////////////FIX THIS PLEASE!!
    text: `INSERT INTO notifications WHERE user_id != $1 AND `,
    values: [userId]
  };
  connection.query(sql, cb);
};

const unseenNoti = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM notifications WHERE user_id=$1 AND seen = FALSE `,
    values: [userId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

const markAsSeenNoti = (userId, cb) => {
  const sql = {
    text: `UPDATE notifications SET seen = TRUE WHERE seen = FALSE AND user_id=$1 RETURNING seen`,
    values: [userId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

const getNotiBySeen = (userId, cb) => {
  const sql = {
    text: `SELECT *  FROM notifications ORDER BY seen`
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  unseenNoti,
  markAsSeenNoti,
  getNotiBySeen,
  addNotification,
  addWatchersNotification
};
