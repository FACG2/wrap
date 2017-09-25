const queries = require('../queries/index.js');
const helper = require('../queries/helpers/projects.js');

module.exports = (req, res, next) => {
  queries.sprints.getTasksByState(req.params.state_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      var arr=helper.groupLabels(result);
      res.render('stateColumn.hbs',{tasks:arr})
    }
  });
};
