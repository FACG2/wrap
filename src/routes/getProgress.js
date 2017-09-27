const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.updateTaskProgress(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      if (result === undefined) {
        result = 0;
      }
      res.send(result);
    }
  });
};
