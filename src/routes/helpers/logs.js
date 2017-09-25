// const queries = require('../../queries/index.js');
//
// const createProject = (username, userId, projectId, projectName, cb) => {
//   const context = `${username} Created New project: ${projectName}`;
//   const link = `/projects/${projectId}`;
//   const type = 'project';
//   const actionId = projectId;
//   queries.logs.addLog(projectId, context, type, link, actionId, username, (err, res) => {
//     if (err) {
//       cb(err);
//     } else {
//       queries.notifications.addNotification();
//     }
//   });
// };
//
// module.exports = {
//   createProject
// };
