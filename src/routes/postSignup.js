const helpers = require('./helpers/index.js');

module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data);
    helpers.users.signUp(data.username, data.githubname, data.email, data.password, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        helpers.token.addToken(res, result.id, result.username, result.avatar);
        res.send('/ref');
      }
    });
  });
};
