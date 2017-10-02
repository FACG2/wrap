const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.moveToBacklog(data.taskId, req.params.project_id, (err, taskDetails) => {
    if (err) {
      res.send('err');
    } else {
      res.send(taskDetails);
    }
  });
};
