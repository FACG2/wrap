const connection = require('../../database/db_connection.js');
const validation = require('..//validation.js');
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
  console.log(password, hashedPassword);
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
        return cb(new Error('Error message:' + data.message), null);
      } else {
        avatar = data.avatar_url;
        cb(null, obj);
      }
    }
  });
}

//
// const validatePassword = (username, password, cb) => {
//   validateUserName(username, (err) => {
//     if (!err) {
//       cb(new Error('user doens\'t exist'));
//     } else {
//       console.log();
//       var sql = {
//         text: 'SELECT password FROM users where username= $1',
//         values: [username]
//       };
//       dbConnection.query(sql, (err, res) => {
//         if (err) {
//           cb(err);
//         } else {
//           if (res.rows.length === 0) {
//             cb(new Error('user doens\'t exist'));
//           } else {
//             comparePasswords(password, res.rows[0].password, (err, res) => {
//               if (err) {
//                 cb(err);
//               } else {
//                 if (!res) {
//                   console.log(res);
//                   cb(new Error('password isn\'t correct'));
//                 } else {
//                   cb(null);
//                 }
//               }
//             });
//           }
//         }
//       });
//     }
//   });
// };
// headers: {'user-agent': 'node.js'}

module.exports = {
  hashPassword,
  existedUserName,
  validateEmail,
  getAvatar
};
