const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getProjectLabels(req.params.project_id, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.render('labelsTab.hbs', {layout: false, labels: result});
  });
};
