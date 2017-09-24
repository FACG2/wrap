
const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
      data = JSON.parse(data);
    queries.tasks.addTask(data.title, data.description, data.priority, data.deadline, data.duration, req.params.project_id, (err, taskDetails) => {
      if (err) {
        res.send('err');
      } else {
        console.log(taskDetails);
        res.send(taskDetails)
      }
    });
  });
};
