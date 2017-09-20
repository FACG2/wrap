const connection = require('../../database/db_connection.js');
const bcrypt = require('bcrypt');
const qusers = require('../users.js');
const request = require('request');
const existedUserName = (username, cb) => {
  qusers.getUserByUserName(username, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length > 0) {
        cb(new Error('username already exists'));
      } else {
        cb(null);
      }
    }
  });
};
const existedEmail = (email, cb) => {
  qusers.getUserByEmail(email, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length > 0) {
        cb(new Error('email already exists'));
      } else {
        cb(null);
      }
    }
  });
};

const hashPassword = (password, cb) => {
  bcrypt.genSalt(333, (err, salt) => {
    if (err) {
      cb(err);
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          cb(err);
        } else {
          cb(null, hash);
        }
      });
    }
  });
};

const comparePasswords = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

function getAvatar (githubUserName, cb) {
  let avatar = '';
  let arr = [];
  let path = 'https://api.github.com/users/' + githubUserName + '?access_token=' + process.env.TOKEN;
  request({url: path}, (err, response, body) => {
    if (err) {
      cb(err, {});
    } else {
      let data = JSON.parse(body);
      if (data.message) {
       cb(null,'');
      } else {
        avatar = data.avatar_url;
        cb(null, avatar);
      }
    }
  });
}

module.exports = {
  hashPassword,
  existedUserName,
  existedEmail,
  getAvatar
};
