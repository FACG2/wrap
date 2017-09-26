const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.tasks.getFeatures(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      const isEmpty = result.length == 0 ? true : false;
      res.render(`taskFeatures.hbs`, {features: result, isEmpty: isEmpty });
    }
  });
};
