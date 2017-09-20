const functions = require('../queries/index.js');
const tokenHandler = require('../views/helpers/token.js');

module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data);
    functions.users.getUserLogIn(data.email, data.password, (err, result) => {
      if (err) {
        const message = err === 'not matched' ? err : 'connection error';
        res.send(message);
      } else {
        tokenHandler.addToken(res, result.id, result.username, result.avatar);
        res.send('/ref');
      }
    });
  });
};
