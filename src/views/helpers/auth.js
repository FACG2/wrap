const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(req.url !== '/');
  if (req.url !== '/') {
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
    console.log('sdas');
    next();
};
