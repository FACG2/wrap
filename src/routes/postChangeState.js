const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  console.log(req.params);
  let data = req.body;
  queries.tasks.changeTaskState = (req.params.project_id, req.params.task_id, req.body.name, (err, result) => {
    if (err) {
      res.send('err');
    } else {
      console.log('q5',result);
      res.send(result);
    }
  });
};
