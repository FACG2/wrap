const helpers = require('./helpers/index.js');

module.exports = (req, res, next) => {
  let data = req.body;
  helpers.users.signUp(data.username, data.githubname, data.email, data.password, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      helpers.token.addToken(res, result.id, result.username, result.avatar);
      res.send('/ref');
    }
  });
};
