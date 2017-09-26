const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.sprints.getCurrentSprint(req.params.project_id, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result) {
      queries.sprints.getSprintStates(result.id, (err2, result2) => {
        if (err2) {
          return next(err);
        }
        const data = {sprintId: result.id, sprintName: result.title, states: result2};
        return res.render('sprint.hbs', data);
      });
    }
    return res.render('startSprintTab.hbs');
  });
};
