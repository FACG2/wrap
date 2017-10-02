const queries = require('../queries/index.js');
const helpers = require('./helpers/index.js');

module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.addTask(data.title, data.priority, req.params.project_id, req.user.id, (err, taskDetails) => {
    if (err) {
      res.send('err');
    } else {
      helpers.logs.createTask(req.user.username, req.user.id, req.params.project_id, data.title, taskDetails[0].id, (err2, res2) => {
        if (err2) {
          res.send('err');
        } else {
          res.send(taskDetails);
        }
      });
    }
  });
};
