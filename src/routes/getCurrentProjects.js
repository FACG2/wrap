const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.project.getCurrentProjects(req.result.id, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.render('currentProjects.hbs', {projects: res, isEmpty: res.length === 0});
    }
  });
};
