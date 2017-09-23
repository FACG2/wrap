const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.project.getFinishedProjects(req.user.id, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.render('finishedProjectsTab.hbs', {projects: res, isEmpty: res.length === 0});
    }
  });
};
