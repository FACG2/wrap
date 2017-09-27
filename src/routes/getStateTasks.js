const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');

module.exports = (req, res, next) => {
  queries.sprints.getTasksByState(req.params.state_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      result = helpers.projects.addPriorityColors(result);
      res.render(`stateColumn.hbs`, {layout: false, tasks: result, isEmpty: result.length === 0});
    }
  });
};
