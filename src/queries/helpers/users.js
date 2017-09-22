const bcrypt = require('bcrypt');
const qUsers = require('../users.js');
const request = require('request');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

const getAvatar = (githubUserName, cb) => {
  let path = 'https://api.github.com/users/' + githubUserName;
  request({url: path, headers: {'user-agent': 'node.js'}}, (err, response, body) => {
    if (err) {
      cb(err, {});
    } else {
      let data = JSON.parse(body);
      if (data.message) {
      } else {
        avatar = data.avatar_url;
        cb(null, avatar);
      }
    }
  });
};

module.exports = {
  hashPassword,
  getAvatar
};
