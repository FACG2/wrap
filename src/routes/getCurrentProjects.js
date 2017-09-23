<<<<<<< HEAD

=======
>>>>>>> 6ca5136a19e99955a07f1816db17eec46c76433c
const functions = require('../queries/index.js');
module.exports = (req, res, next) => {
  functions.project.getCurrentProjects(req.result.id, (err, res2) => {
    if (err) {
      next(err);
    } else {
      res2.rows.map(function (id) {
        return functions.project.getProjectDetails(id, (err, result) => {
          if (err) {
            next(err);
          } else {
            res2.render('currentProjects.hbs', result);
          }
        });
      });
    }
  });
};
