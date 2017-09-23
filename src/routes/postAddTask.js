<<<<<<< HEAD

const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.addTask(req.body.title, req.body.priority, req.body.description, req.body.deadline, req.body.duration, req.body.state, req.body.orders, (err, projectData) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('project.hbs');
    }
  });
=======
module.exports = (req, res, next) => {
  console.log(req.body);
>>>>>>> 4db80fa805326a079b9b69e924e5e7948736885f
};
