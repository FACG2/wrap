const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.tasks.getFeatures(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      const isEmpty = result.length === 0;
      res.render(`taskFeatures.hbs`, {layout: false, features: result, isEmpty: isEmpty});
    }
  });
};
