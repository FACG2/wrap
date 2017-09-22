const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDYwODczNzV9.plki7sS5VNRaLGCPlJCn1NV8s - XLiXI_Q2kRJVywYWo', 'wrap shhh', function (err, user) {
  //   console.log('w1w',err);
  //   console.log('ww22ww',user);
  // });
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
