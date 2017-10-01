const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  queries.tasks.getAssign(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};
