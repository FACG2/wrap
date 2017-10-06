const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  // const navValues = (userId, projectNavArr, cb) => {
  queries.users.navValues(req.user.id, req.body, (err, result) => {
    if (err) {
      next(err);
    } else {
      queries.projects.getAllProjects(req.user.id, (err2, result2) => {
        if (err) {
          return next(err);
        }
        return res.send(result2.rows);
      });
    }
  });
};
