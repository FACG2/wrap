const connection = require('../database/db_connection.js');

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
  getNotiBySeen
};
