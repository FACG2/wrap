const functions = require('../queries/index.js');
const tokenHandler = require('../views/helpers/token.js');

module.exports = (req, res, next) => {
  functions.users.getUserLogIn(req.body.email, req.body.password, (err, result) => {
    if (err) {
      next(err);
    } else {
      tokenHandler.addToken(res, result.id, result.username, result.avatar);
      res.render('dashboard.hbs');
    }
  });
};
