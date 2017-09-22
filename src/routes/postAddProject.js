const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.addProject(req.body.title, req.body.wDays, req.body.wHours, req.body.description, req.user.id, (err, projectData) => {
    if (err) {
      return next(err);
    }
    res.render('project.hbs');
  });
};
