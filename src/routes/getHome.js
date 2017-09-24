const dashboard = require('./helpers/index.js').dashboard;

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.render('login.hbs', {isLogin: true, scriptName: 'login'});
  } else {
    dashboard.getDashboardData(req.user.id, (err, data) => {
      if (err) {
        next(err);
      } else {
        data.scriptName = 'dashboard';
        data.user = req.user;
        res.render('dashboard.hbs', data);
      }
    });
  }
};
