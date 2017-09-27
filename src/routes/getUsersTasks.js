const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');

module.exports = (req, res, next) => {
  queries.tasks.filterByPriority(req.user.id, (err, data) => {
    if (err) {
      return next(err.message);
    }
    data = helpers.projects.addPriorityColors(data);
    return res.render('tasksTab', {layout: false, tasks: data, isEmpty: data.length === 0});
  });
};
