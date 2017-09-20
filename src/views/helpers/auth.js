const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const url = req.url;
  if (url !== '/' && url !== '/login' && url !== '/signup') {
    const token = req.cookies.token;
    if (!token) {
      return res.render('error.hbs', {message: 'Access is denied, Please login'});
    } else {
      jwt.verify(token, 'wrap shhh', function (err, user) {
        if (err) {
          res.cookie('token', '', {maxAge: 0});
          return res.render('error.hbs', {message: 'Access is denied, Please login'});
        } else {
          req.user = user;
          return next();
        }
      });
    }
  }
  next();
};
