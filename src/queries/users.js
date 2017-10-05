const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
const helpers = require('./helpers/projects.js');
require('env2')('./config.env');

const getUserByEmail = (email, cb) => {
  const sql = {
    text: `SELECT id FROM users WHERE email = $1`,
    values: [email] };

  connection.query(sql, (err, rs) => {
    if (err || rs.rows.length === 0) {
      cb(new Error('The user registered in the website'));
    } else {
      cb(null, rs.rows[0]);
    }
  });
};

const getUserById = (id, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [id] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getRole = (userId, projectId, cb) => {
  const sql = {
    text: `SELECT role FROM user_project WHERE user_id = $1 AND project_id = $2`,
    values: [userId, projectId] };

  connection.query(sql, cb);
};

const getUserByUserName = (userName, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [userName] };

  connection.query(sql, cb);
};

const getUserLogIn = (email, password, cb) => {
  const sql = {
    text: `SELECT users.id, users.username, users.avatar, users.password FROM users WHERE email = $1`,
    values: [email]
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      if (res.rows.length === 0 || !users.comparePassword(password, res.rows[0].password)) {
        cb(new Error('not matched'));
      } else {
        cb(null, res.rows[0]);
      }
    }
  });
};

const signUp = (username, githubname, email, password, cb) => {
  const hashed = users.hashPassword(password);
  users.getGithubAvatar(githubname, (err, avatar) => { // error handled by putting avatarRes as optional argument for signup
    let msg, val;
    if (!err) {
      msg = `INSERT INTO users (username,githubname,email,password,avatar) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
      val = [username, githubname, email, hashed, avatar];
    } else {
      msg = `INSERT INTO users (username,githubname,email,password) VALUES ($1,$2,$3,$4) RETURNING *`;
      val = [username, githubname, email, hashed];
    }
    const sql = {
      text: msg,
      values: val
    };
    connection.query(sql, (err, res) => {
      if (err) {
        cb(new Error('Connection Error!'));
      } else {
        cb(null, res.rows[0]);
      }
    });
  });
};

const invite = (senderId, email, projectId, cb) => {
  const sql = {
    text: `INSERT INTO invites (sender_id,email,project_id) VALUES ($1,$2,$3) RETURNING *`,
    values: [senderId, email, projectId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

const checkInvitation = (email, cb) => {
  const sql = {
    text: `SELECT id FROM invites WHERE email = $1`,
    values: [email] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const deleteInvitation = (inviteId, cb) => {
  const sql = {
    text: `DELETE FROM invites WHERE invites.id=$1`,
    values: [inviteId] };
  connection.query(sql, cb);
};
const navValues = (userId, projectNavArr, cb) => {
  const sql = helpers.projectNav(userId, projectNavArr);
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
module.exports = {
  getUserByEmail,
  getUserById,
  signUp,
  getUserLogIn,
  getUserByUserName,
  invite,
  checkInvitation,
  deleteInvitation,
  getRole,
  navValues
};
