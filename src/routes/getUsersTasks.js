const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.tasks.filterByPriority(req.user.id, (err, data) => {
    if (err) {
      return next(err.message);
    }
    console.log("hana",data);
    return res.render('tasksTab', {tasks: data, isEmpty: data.length === 0});
  });
};
