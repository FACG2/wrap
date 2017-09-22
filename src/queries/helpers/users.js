const bcrypt = require('bcrypt');
const qUsers = require('../users.js');
const request = require('request');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

function getGithubAvatar (githubUserName, cb) {
  let path = 'https://api.github.com/users/' + githubUserName + '?access_token=' + process.env.TOKEN;
  cb('error');
  // request({url: path}, (err, response, body) => {
  //   if (err) {
  //     cb(err.message);
  //   } else {
  //     let data = JSON.parse(body);
  //     if (data.message) {
  //       cb(data.message);
  //     } else {
  //       const avatar = data.avatar_url;
  //       cb(null, avatar);
  //     }
  //   }
  // });
}

module.exports = {
  hashPassword,
  getGithubAvatar
};
