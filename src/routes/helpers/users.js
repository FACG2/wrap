const queries = require('../../queries/index.js');

const signUp = (username, githubname, email, password, cb) => {
  existedUserName(username, (err) => {
    if (err) {
      cb(err);
    } else {
      existedEmail(email, (err) => {
        if (err) {
          cb(err);
        } else {
          queries.users.signUp(username, githubname, email, password, cb);
        }
      });
    }
  });
};

const existedUserName = (username, cb) => {
  queries.users.getUserByUserName(username, (err, res) => {
    if (err) {
      cb('connection Error');
    } else {
      if (res.rows.length > 0) {
        cb('username already exists');
      } else {
        cb(null);
      }
    }
  });
};
const existedEmail = (email, cb) => {
  queries.users.getUserByEmail(email, (err, res) => {
    if (err) {
      cb('Connection Error');
    } else {
      if (res.rows.length > 0) {
        cb('email already exists');
      } else {
        cb(null);
      }
    }
  });
};
module.exports = {
  signUp,
  existedUserName,
  existedEmail
};
