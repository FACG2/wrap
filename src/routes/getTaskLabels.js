const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.tasks.getTaskLabels(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      const isEmpty = result.length === 0;
      res.render(`taskLabels.hbs`, {layout: false, labels: result, isEmpty: isEmpty});
    }
  });
};
