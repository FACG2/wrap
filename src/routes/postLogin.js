const queries = require('../queries/index.js');
const tokenHandler = require('./helpers/index.js').token;

module.exports = (req, res, next) => {
  let data = req.body;
  queries.users.getUserLogIn(data.email, data.password, (err, result) => {
    if (err) {
      const message = err.message === 'not matched' ? err.message : 'connection error';
      res.send(message);
    } else {
      tokenHandler.addToken(res, result.id, result.username, result.avatar);
      res.send('/ref');
    }
  });
};
