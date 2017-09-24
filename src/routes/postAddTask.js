
const queries = require('../queries/index.js');





module.exports = (req, res, next) => {
  queries.projects.addTask(req.params.project_id,req.body.title, req.body.priority, req.body.description, req.body.deadline, req.body.duration, req.body.state_id, req.body.orders, (err, projectData) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('project.hbs');
    }
  });
};
