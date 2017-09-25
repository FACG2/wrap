const queries = require('../queries/index.js');
const logs = require('./helpers/index.js').logs;
module.exports = (req, res, next) => {
  queries.projects.addProject(req.body.title, req.body.wDays, req.body.wHours, req.body.description, req.user.id, (err, projectData) => {
    if (err) {
      return next(err);
    }
    logs.createProject(req.user.username, req.user.id, projectData.id, projectData.title, (err, result) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/projects/${projectData.id}`);
    });
  });
};
