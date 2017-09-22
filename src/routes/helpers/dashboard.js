const queries = require('../../queries/index.js');

const getDashboardData = (userId, cb) => {
  queries.projects.getAllProjects(userId, (projectErr, projects) => {
    if (projectErr) {
      cb(projectErr);
    } else {
      queries.tasks.getTasksByUserId(userId, (tasksErr, tasks) => {
        if (tasksErr) {
          cb(tasksErr);
        } else {
          queries.tasks.getCurrentTasks(userId, (cTasksErr, currentTasks) => {
            if (cTasksErr) {
              cb(cTasksErr);
            } else {
              cb(null, {noOfAllTasks: tasks.rows.length, noOfCurrentTasks: currentTasks.rows.length, noOfAllProjects: projects.rows.length});
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
