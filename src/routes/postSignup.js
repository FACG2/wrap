const tokenHandler = require('../views/helpers/token.js');
const functions = require('../queries/index.js');

module.exports = (req, res, next) => {
  functions.users.signUp(req.body.username, req.body.githubname, req.body.password, (err, result) => {
    if (err) {
      next(err);
    } else {
      tokenHandler.addToken(res, result.id, result.username, result.avatar);
      res.render('dashboard.hbs');
    }
  });
};
