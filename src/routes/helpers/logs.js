const queries = require('../../queries/index.js');

const createProject = (username, userId, projectId, projectName, cb) => {
  let context = `${username} Created a New project: ${projectName}`;
  const link = `/projects/${projectId}`;
  const type = 'project';
  const actionId = projectId;

  queries.logs.addLog(projectId, username, context, type, link, actionId, (err, res) => {
    if (err) {
      cb(err);
    } else {
      context = `You Created a New project: ${projectName}`;
      queries.notifications.addNotification(userId, context, link, cb);
    }
  });
};

const createTask = (username, userId, projectId, taskName, taskId, cb) => {
  let context = `${username} Created a New task: ${taskName}`;
  const link = `/${projectId}/tasks/${taskId}`;
  const type = 'task';
  const actionId = taskId;
  queries.logs.addLog(projectId, username, context, type, link, actionId, (err, res) => {
    if (err) {
      cb(err);
    } else {
      queries.notifications.addWatchersNotification(userId, projectId, context, link, cb);
    }
  });
};

module.exports = {
  createProject,
  createTask
};
