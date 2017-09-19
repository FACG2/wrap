const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');

const getUserByEmail = (email, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
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
      cb(null, res);
    }
  });
};

const getUserByUserName = (userName, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [userName] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const signUp = (username, githubname, email, password, avatar) => {
  users.existedUserName(username, (err) => {
    if (err) {
      cb(err);
    } else {
      users.existedEmail(email, (err) => {
        if (err) {
          cb(err);
        } else {
          users.hashPassword(password, (err, hashed) => {
            if (err) {
              cb(err);
            } else {
              const sql = {
                text: `INSERT INTO users (username,githubname,email,password,avatar) VALUES ($1,$2,)`,
                value: [username, githubname, email, hashed, avatar]
              };
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
    }
  });
};

module.exports = {
  hashPassword,
  existedUserName,
  existedEmail,
  getUserByEmail,
  getUserById,
  getUserByUserName
};
