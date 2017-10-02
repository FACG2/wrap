const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  const durationInDays = req.body.duration;
  queries.sprints.addSprint(durationInDays, req.params.project_id, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.send('/rel');
    }
  });
};
