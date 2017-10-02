const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.addFeature(data.title, req.params.task_id, (err, featureDetails) => {
    if (err) {
      res.send('err');
    } else {
      res.send(featureDetails);
    }
  });
};
