
const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data);
    console.log('qqqqqq',req.params.task_id, req.params.feature_id,data);
    queries.tasks.checkFeature(req.params.task_id, req.params.feature_id,data, (err, taskDetails) => {
      if (err) {
        res.send('err');
      } else {
        res.send(taskDetails);
      }
    });
  });
};
