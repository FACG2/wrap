const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getFinishedProjects(req.user.id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render('finishedProjectsTab.hbs', {layout: false, projects: result, isEmpty: result.length === 0});
    }
  });
};
