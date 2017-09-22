const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');

//
// const getTasksByUserName = (userName, cb) => {
//   const sql = {
//     text: `SELECT project_id FROM user_project WHERE assigned = $1`,
//     values: [userName] };
//
//   connection.query(sql, (err, res) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, res);
//     }
//   });
// };

const getTasksByUserId = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE assigned_id= $1`,
    values: [userId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getCurrentTasks = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE assigned_id= $1 AND state != 'done'`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getCurrentProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = $1 AND projects.finished= false`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getProjectDetails = (projectId, cb) => {
  const sql = {
    text: `SELECT projects.title,projects.progress  FROM projects WHERE projects.id = $1`,
    values: [projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

getProjectDetails(2, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

const getFinishedProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = ${userId} AND projects.finished= true`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getAllProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = ${userId}`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

// / get the current tasks orderd by priority
const FilterByPriority = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE assigned_id= $1 AND state != 'done' ORDER BY priority ASC `,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};
// /// filter by deadline in the front-end

const getProjectName = (taskId, cb) => {
  const sql = {
    text: `SELECT projects.title FROM projects INNER JOIN tasks ON tasks.project_id = projects.id WHERE tasks.id = $1`,
    values: [taskId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getAllSprints = (projectId, cb) => {
  const sql = {
    text: `SELECT sprints.id, sprints.title, sprints.progress FROM sprints WHERE project_id= $1`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getFinishedSprints = (projectId, cb) => {
  const sql = {
    text: `SELECT sprints.id, sprints.title, sprints.progress FROM sprints WHERE project_id= $1 AND closed != False`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getCurrentSprints = (projectId, cb) => {
  const sql = {
    text: `SELECT sprints.id, sprints.title, sprints.progress FROM sprints WHERE project_id= $1 AND closed = False`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getTasksByState = (sprintId, state, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE sprint_id= $1 AND state = $2`,
    values: [projectId, state] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = {
  getTasksByUserId,
  getCurrentTasks,
  getCurrentProjects,
  getFinishedProjects,
  getAllProjects,
  FilterByPriority,
  getAllSprints,
  getFinishedSprints,
  getCurrentSprints,
  getTasksByState,
  getProjectDetails
};
