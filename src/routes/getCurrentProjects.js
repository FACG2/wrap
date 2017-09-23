const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.project.getCurrentProjects(req.user.id, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.render('currentProjectsTab.hbs', {projects: res, isEmpty: res.length === 0});
    }
  });
};
