const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    const durationInDays = parseInt(data);
    queries.sprints.addSprint(durationInDays, req.params.project_id, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send('/rel');
      }
    });
  });
};
