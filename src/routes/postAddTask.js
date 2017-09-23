const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.addTask(req.body.title, req.body.priority, req.body.description, req.body.deadline, req.body.duration, req.body.state, req.body.orders, (err, projectData) => {
    if (err) {
      return next(err);
    }
    res.redirect('project.hbs');
  });
};
