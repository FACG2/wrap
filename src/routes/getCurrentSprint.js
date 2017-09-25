const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  console.log('hellllllll');
  queries.sprints.getCurrentSprint(req.params.project_id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result) {

    }
    return res.render('startSprintTab.hbs');
  });
};
