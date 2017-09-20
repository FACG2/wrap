const jwt = require('jsonwebtoken');
const functions = require('../queries/index.js');

module.exports = (req, res, next) => {
  functions.users.signUp(req.body.username, req.body.githubname, req.body.password, (err, result) => {
    if (err) {
      next(err);
    } else {
      const tempToken = {id: result.id, username: result.username, avatar: result.avatar};
      const token = jwt.sign(tempToken, 'wrap shhh');
      res.cookie('token', token);
      res.render('dashboard.hbs');
    }
  });
};
