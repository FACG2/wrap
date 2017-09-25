const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getCurrentProjects(req.user.id, (err, result) => {
    if (err) {
      next(err);
    } else {
      console.log('hahhhhhhhhhhhh',result);
      res.render('currentProjectsTab.hbs', {projects: result, isEmpty: result.length === 0});
    }
  });
};
