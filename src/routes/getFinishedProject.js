const functions = require('../queries/index.js');
module.exports = (req, res, next) => {
  functions.project.getFinishedProjects(req.result.id, (err, res2) => {
    if (err) {
      next(err);
    } else {
      res2.rows.map(function (id) {
        return functions.project.getProjectDetails(id, (err, result) => {
          if (err) {
            next(err);
          } else {
            res2.render('FinishedProjects.hbs', result);
          }
        });
      });
    }
  });
};
