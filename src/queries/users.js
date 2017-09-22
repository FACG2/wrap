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

const getUserLogIn = (email, password, cb) => {
  const hashed = users.hashPassword(password);
  const sql = {
    text: `SELECT users.id, users.username, users.avatar FROM users WHERE password = $1`,
    values: [hashed]
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      if (res.rows.length === 0) {
        cb('not matched');
      } else {
        cb(null, res.rows);
      }
    }
  });
};

const signUp = (username, githubname, email, password, cb) => {
  const hashed = users.hashPassword(password);
  users.getGithubAvatar(githubname, (err, avatar) => { // error handled by putting avatarRes as optional argument for signup
    let msg = avatar ? `INSERT INTO users (username,githubname,email,password,avatar) VALUES ($1,$2,$3,$4,$5)` : `INSERT INTO users (username,githubname,email,password) VALUES ($1,$2,$3,$4)`;
    const sql = {
      text: msg,
      values: [username, githubname, email, hashed, avatar]
    };
    connection.query(sql, (err, res) => {
      if (err) {
        console.log(err);
        cb('Connection Error!');
      } else {
        cb(null, res.rows);
      }
    });
  });
};
// module.exports = 'walifdsklfjdskf';
module.exports = {
  getUserByEmail,
  getUserById,
  signUp,
  getUserLogIn,
  getUserByUserName
};
