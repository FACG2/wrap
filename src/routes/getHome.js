const dashboard = require('./helpers/index.js').dashboard;

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.render('login.hbs', {isLogin: true});
  } else {
    dashboard.getDashboardData(req.user.id, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.render('dashboard.hbs', data);
      }
    });
  }
};
