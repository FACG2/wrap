const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.tasks.listComments(req.params.task_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      const isEmpty = result.length === 0;
      res.render(`comments.hbs`, {layout: false, comments: result, isEmpty: isEmpty});
    }
  });
};
