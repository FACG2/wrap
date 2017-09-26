const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.sprints.getTasksByState(req.params.state_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render(`stateColumn.hbs`, {tasks: result, isEmpty: result.length === 0});
    }
  });
};
