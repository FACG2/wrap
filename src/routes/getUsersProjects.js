const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getAllProjects(req.user.id, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.send(result.rows);
  });
};
