const connection = require('../database/db_connection.js');

const addNotification = (userId, context, link, cb) => {
  const sql = {
    text: `INSERT INTO notifications (user_id,context,link) VALUES ($1,$2,$3)`,
    values: [userId, context, link]
  };
  connection.query(sql, cb);
};

// add notifications to all users except the one who made it (userId)
const addWatchersNotification = (userId, projectId, context, link, cb) => {
  getAllWatchersExcept(userId, projectId, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length !== 0) {
        const ids = res.rows.map((item) => {
          return item.user_id;
        });
        let sqlText = `INSERT INTO notifications (user_id, context, link) VALUES `;
        sqlText += res.rows.map((id, i) => {
          return `($${i + 3},$1,$2)`;
        });
        let sqlValues = [context, link, ...ids];
        const sql = {
          text: sqlText,
          values: sqlValues
        };
        connection.query(sql, cb);
      } else {
        cb(null);
      }
    }
  });
};
const getAllWatchersExcept = (userId, projectId, cb) => {
  const sql = {
    text: `SELECT user_id FROM user_project WHERE user_id != $1 AND project_id= $2 AND watch = true`,
    values: [userId, projectId]
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
