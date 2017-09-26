const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.logs.viewLogs(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render('logsTab.hbs', {layout: false, logs: result, isEmpty: result.length === 0});
    }
  });
};
