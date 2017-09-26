const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.sprints.getCurrentSprint(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      if (result) {
        queries.sprints.getSprintStates(result.id, (err2, result2) => {
          if (err2) {
            next(err);
          } else {
            const data = {layout: false, sprintId: result.id, sprintName: result.title, states: result2};
            res.render('sprint.hbs', data);
          }
        });
      } else {
        return res.render('startSprintTab.hbs', {layout: false});
      }
    }
  });
};
