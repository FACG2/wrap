const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');
module.exports = (req, res, next) => {
  queries.tasks.getTaskDetails(req.params.project_id, req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      let data = {task: result};
      result = helpers.projects.addPriorityColor(result);
      data.user = req.user;
      data.scriptName = 'task';
      res.render(`task.hbs`, data);
    }
  });
};
