const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');
module.exports = (req, res, next) => {
  queries.projects.getProjectNameById(req.params.project_id, (error, res1) => {
    if (error) {
      next(error);
    } else {
      queries.tasks.getTaskDetails(req.params.project_id, req.params.task_id, (err, result) => {
        if (err) {
          next(err);
        } else {
          if (result) {
            let data = {task: result};
            result = helpers.projects.addPriorityColor(result);
            data.user = req.user;
            data.projectName = res1;
            data.scriptName = 'task';
            data.project_id = req.params.project_id;
            res.render(`task.hbs`, data);
          } else {
            next(new Error('There is no task in this path :('));
          }
        }
      });
    }
  });
};
