const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');
module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.changeTaskPriority(req.params.task_id, data.priority, (err, result) => {
    if (err) {
      res.send('err');
    } else {
      result = helpers.projects.addPriorityColor(result);
      res.send(result);
    }
  });
};
