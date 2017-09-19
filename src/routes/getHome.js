const functions = require('../queries/index.js');
module.exports = (req, res, next) => {
  res.render('login.hbs');
};



exports.confirmSignUp = (req, res, next) => {
  functions.users.signUp(req.body.username, req.body.githubname, req.body.password, req.body.avatar, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render('dashboard.hbs')
    }
  });
};
