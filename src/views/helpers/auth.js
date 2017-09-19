const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.url !== '/') {
    const token = req.cookies.token;
    if (!token) {
      res.render('error.hbs', {message: 'Access is denied, Please login'});
    } else {
      jwt.verify(token, 'wrap shhh', function (err, user) {
        if (err) {
          res.cookie('token', '', {maxAge: 0});
          res.render('error.hbs', {message: 'Access is denied, Please login'});
        } else {
          req.user = user;
          next();
        }
      });
    }
  }
};
