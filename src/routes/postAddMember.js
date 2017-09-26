const queries = require('../queries/index.js');
module.exports = (req, res, next) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data);
    queries.users.getUserByEmail(data.email, (err2, userId) => {
      if (err2) {
        res.send(err2);
      } else {
        console.log(':(((((');
        queries.projects.addMember(userId.id, req.params.project_id, data.role, (er, memberDetails) => {
          if (er) {
            console.log("walid");
            res.send('er');
          } else {
            console.log('hanaaaaaaaaa');
            res.send(null, memberDetails);
          }
        });
      }
    });
  });
};
