// const queries = require('../queries/index.js');
// module.exports = (req, res, next) => {
//   queries.sprints.getCurrentSprint(req.params.project_id, (err, result) => {
//     if (err) {
//       return next(err);
//     } else {
//       // // there is no current sprints
//       if (result === undefined) {
//
//       } else {
//         queries.sprints.getSprintStates(req.params.sprint_id, (error, sprintNames) => {
//           const tasks = sprintNames.map(function (name) {
//             const tasks = [];
//             queries.sprints.getTasksByState(name, (err, stateTasks) => {
//               if (err) {
//
//               } else {
//                 return stateTasks;
//               }
//             });
//           });
//         });
//       }
//     }
//   });
// };
//
// queries.sprints.getCurrentSprint(1, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     if (res === undefined) {
//     } else {
//       queries.sprints.getSprintStates(1, (error, sprintNames) => {
//         console.log(sprintNames);
//         const tasks = sprintNames.map(function (name) {
//           const task = {};
//           queries.sprints.getTasksByState(name.name, (err, stateTasks) => {
//             if (err) {
//               console.log(err);
//             } else {
//               return stateTasks;
//             }
//           });
//         });
//         console.log(tasks);
//       });
//
//     }
//   }
// });
