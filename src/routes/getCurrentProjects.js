<<<<<<< HEAD
// const functions = require('../queries/index.js');
// module.exports = (req, res, next) => {
//   functions.project.getCurrentProjects(req.result.id, (err, res2) => {
//     if (err) {
//       next(err);
//     } else {
//
//     res2.rows.map(function(id) {
//      return functions.project.getProjectDetails(id, (err, result) => {
//        if (err) {
//          next(err);
//        } else {
//
//        });
// });
//     }
//   });
// };
=======
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
>>>>>>> 4db80fa805326a079b9b69e924e5e7948736885f
