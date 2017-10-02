const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getAllMembersInProject(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
};
