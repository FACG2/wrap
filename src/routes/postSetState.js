const queries = require('../queries/index.js');

module.exports = (req, res, next) => {
  let data = req.body;
  queries.tasks.changeState(data.sprintId, data.stateId, data.taskId, (err, taskDetails) => {
    if (err) {
      res.send('err');
    } else {
      if (data.stateName === 'done') {
        queries.projects.setTaskProgress(100, taskDetails[0].id, (err2, res2) => {
          if (err2) {
            res.send('err');
          } else {
            taskDetails[0].progress = res2.rows[0].progress;
            queries.projects.updateProjectProgress(req.params.project_id, (err3, res3) => {
              if (err3) {
                res.send('err');
              } else {
                res.send(taskDetails);
              }
            });
          }
        });
      } else {
        queries.projects.updateTaskProgress(taskDetails[0].id, (err2, res2) => {
          if (err2) {
            res.send('err');
          } else {
            taskDetails[0].progress = res2;
            res.send(taskDetails);
          }
        });
      }
    }
  });
};
