const dashboard = require('./helpers/index.js').dashboard;

module.exports = (req, res, next) => {
  dashboard.getDashboardData(req.user.id, (err, data) => {
    if (err) {
      res.status(500);
      next(err);
    } else {
      data.layout = false;
      res.render('dashboardTab.hbs', data);
    }
  });
};
