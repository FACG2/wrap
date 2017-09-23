const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const url = req.url;
  const token = req.cookies.token;
  if (!token) {
    if (url === '/' || url === '/login' || url === '/signup') {
      return next();
    }
    return res.render('error.hbs', {message: 'Access is denied, Please login'});
  } else {
    jwt.verify(token, 'wrap shhh', (err, user) => {
      if (err) {
        res.cookie('token', '', {maxAge: 0});
        return res.render('error.hbs', {message: 'Access is denied, Please login'});
      } else {
        req.user = user;
        return next();
      }
    });
  }
};
