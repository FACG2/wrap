const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.tasks.filterByPriority(req.user.id, (err, data) => {
    if (err) {
      return next(err.message);
    }
<<<<<<< HEAD
    return res.send(data);
=======
    return res.render('tasksTab', {tasks: data, isEmpty: data.length === 0});
>>>>>>> 4db80fa805326a079b9b69e924e5e7948736885f
  });
};
