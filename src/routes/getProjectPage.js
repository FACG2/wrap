const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  let data = {project_id: req.params.project_id};
  data.user = req.user;
  data.scriptName = 'project';
  data.hasCurrentSprint = false;
  queries.sprints.getCurrentSprint(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      if (result) {
        data.hasCurrentSprint = true;
        queries.sprints.getSprintStates(result.id, (err2, result2) => {
          if (err2) {
            next(err);
          } else {
            data.sprintId = result.id;
            data.sprintName = result.title;
            data.states = result2;
            res.render('project.hbs', data);
          }
        });
      } else {
        res.render('project.hbs', data);
      }
    }
  });
};
