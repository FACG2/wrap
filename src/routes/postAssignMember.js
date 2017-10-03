const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.assignMember(data.username, req.params.project_id, req.params.task_id, (err, assignDetails) => {
    if (err) {
      res.send('err');
    } else {
      res.send(assignDetails);
    }
  });
};
