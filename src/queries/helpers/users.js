const bcrypt = require('bcrypt');
const request = require('request');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
const getGithubAvatar = (githubUserName, cb) => {
  let path = 'https://api.github.com/users/' + githubUserName;
  request({url: path, headers: {'user-agent': 'node.js'}}, (err, response, body) => {
    if (err) {
      cb(new Error('Connection error!'));
    } else {
      let data = JSON.parse(body);
      if (data.message) {
        cb(new Error('Connection error!'));
      } else {
        const avatar = data.avatar_url;
        cb(null, avatar);
      }
    }
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  getGithubAvatar
};
