const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  queries.projects.getAllMembersInProject(req.params.project_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.render('membersTab.hbs', {layout: false, members: result, isEmpty: result.length === 0});
    }
  });
};
