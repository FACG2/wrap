const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.sprints.getBacklogTasks(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render(`stateColumn.hbs`, {layout: false, tasks: result, isEmpty: result.length === 0});
    }
  });
};
