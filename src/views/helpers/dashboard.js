const tokenHandler = require('../views/helpers/token.js');
const functions = require('../../queries/index.js');

const getDashboardData = (userId, cb) => {
  functions.projects.getAllProjects(userId, (projectErr, projects) => {
    if (projectErr) {
      cb(projectErr);
    } else {
      functions.projects.getTasksByUserId(userId, (tasksErr, tasks) => {
        if (tasksErr) {
          cb(tasksErr);
        } else {
          functions.projects.getCurrentTasks(userId, (cTasksErr, currentTasks) => {
            if (cTasksErr) {
              cb(cTasksErr);
            } else {
              cb(null, {noOfAllTasks: tasks.rows.length, noOfCurrentTasks: currentTasks.rows.length, noOfAllProjects: projects.row.length});
            }
          });
        }
      });
    }
  });
};

module.exports = {
  getDashboardData
};
