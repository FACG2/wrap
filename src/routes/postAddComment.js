const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
      data = JSON.parse(data);
    queries.tasks.addComment(req.user.id,data.context, req.params.task_id, (err, commentDetails) => {
      if (err) {
        res.send('err');
      } else {
        res.send(commentDetails)
      }
    });
  });
};
