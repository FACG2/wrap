const connection = require('../database/db_connection.js');
require('env2')('./config.env');

const getCurrentProjects = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = $1 AND projects.finished= false`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getProjectNameById = (projectId, cb) => {
  const sql = {
    text: `SELECT title FROM projects WHERE id = $1 `,
    values: [projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0].title);
    }
  });
};

const createBacklog = (projectId, cb) => {
  const sql = {
    text: `INSERT INTO state (name,project_id) VALUES ('backlog',$1) RETURNING *`,
    values: [projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
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
      cb(null, res.rows[0]);
    }
  });
};

const getFinishedProjects = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = $1 AND projects.finished= true`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getAllProjects = (userId, cb) => {
  const sql = {
    text: `SELECT project_id FROM user_project INNER JOIN projects ON user_project.project_id = projects.id WHERE user_project.user_id = $1`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

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

const invite = (senderId, email, projectId, cb) => {
  const sql = {
    text: `INSERT INTO invites (sender_id,email,project_id) VALUES ($1,$2,$3)`,
    values: [senderId, email, projectId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.row);
    }
  });
};

const getMemberInProject = (userId, projectId, cb) => {
  const sql = {
    text: `SELECT * FROM user_project WHERE user_id = $1 AND project_id = $2`,
    values: [userId, projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const getMemberByEmail = (email, projectId, cb) => {
  const sql = {
    text: `SELECT users.id FROM users INNER JOIN user_project ON user_project.user_id = users.id WHERE users.email=$1 AND user_project.project_id=$2`,
    values: [email, projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getAllMembersInProject = (projectId, cb) => {
  const sql = {
    text: `SELECT users.avatar,users.username, users.email  FROM user_project INNER JOIN users ON user_project.user_id = users.id WHERE project_id = $1`,
    values: [projectId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const addMember = (userId, projectId, role, cb) => {
  getMemberInProject(userId, projectId, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length > 0) {
        // / existed user
        cb(new Error('User already a member in this project'));
      } else {
        let sql;
        if (role === 'admin') {
          sql = {
            text: `INSERT INTO user_project (user_id,project_id,role,watch) VALUES ($1,$2,$3,$4) RETURNING *`,
            values: [userId, projectId, role, true]
          };
        } else {
          sql = {
            text: `INSERT INTO user_project (user_id,project_id,role) VALUES ($1,$2,$3) RETURNING *`,
            values: [userId, projectId, role]
          };
        }

        connection.query(sql, (error, result) => {
          if (error) {
            cb(error);
          } else {
            cb(null, result.rows);
          }
        });
      }
    }
  });
};

const addProject = (title, wDay, wHour, description, userId, cb) => {
  const sql = {
    text: `INSERT INTO projects (title,wDay,wHour,description) VALUES ($1,$2,$3,$4) RETURNING *`,
    values: [title, wDay, wHour, description]
  };
  connection.query(sql, (error, project) => {
    if (error) {
      cb(error);
    } else {
      addMember(userId, project.rows[0].id, 'admin', (err, res) => {
        if (err) {
          cb(err);
        } else {
          createBacklog(project.rows[0].id, (err2, res2) => {
            if (err) {
              cb(err);
            } else {
              cb(null, project.rows[0]);
            }
          });
        }
      });
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
    values: [sprintId, state] };
  connection.query(sql, cb);
};

const updateProjectProgress = (projectId, cb) => {
  const sql = {
    text: `SELECT tasks.progress FROM tasks WHERE project_id= $1`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      var totalProgrss = res.rows.reduce(function (sum, task, i) {
        return sum + parseInt(task.progress);
      }, 0);
      let val = (totalProgrss / res.rows.length);
      val = isNaN(val) ? 0 : val;
      const sql2 = {
        text: `UPDATE projects SET progress=$1 WHERE id=$2`,
        values: [val, projectId] };
      connection.query(sql2, cb);
    }
  });
};

const updateSprintProgress = (sprintId, cb) => {
  const sql = {
    text: `SELECT tasks.progress FROM tasks WHERE sprint_id= $1 `,
    values: [sprintId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      var totalProgrss = res.rows.reduce(function (sum, task) {
        return sum + parseInt(task.progress);
      }, 0);
      let val = Math.round((totalProgrss / res.rows.length));
      val = isNaN(val) ? 0 : val;
      const sql2 = {
        text: `UPDATE sprints SET progress=$1 WHERE id=$2`,
        values: [val, sprintId] };
      connection.query(sql2, cb);
    }
  });
};
const setTaskProgress = (val, taskId, cb) => {
  val = Math.round(val);
  const sql2 = {
    text: `UPDATE tasks SET progress=$1 WHERE id=$2 RETURNING progress`,
    values: [val, taskId] };
  connection.query(sql2, cb);
};
const updateTaskProgress = (taskId, cb) => {
  const sql = {
    text: `SELECT tasks.project_id, features.finished FROM features INNER JOIN tasks on tasks.id = features.task_id WHERE features.task_id= $1`,
    values: [taskId]
  };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      let trues = 0;
      let noTrues = res.rows.reduce(function (sum, item) {
        if (item.finished === true) {
          trues += 1;
        }
        return trues;
      }, 0);
      let val = (noTrues / res.rows.length) * 100;
      val = isNaN(val) ? 0 : val;
      setTaskProgress(val, taskId, (err, result) => {
        if (err) {
          cb(err);
        } else {
          const sql3 = {
            text: `SELECT sprint_id,project_id FROM tasks WHERE id =$1`,
            values: [taskId]
          };
          connection.query(sql3, (err, result2) => {
            if (err) {
              cb(err);
            }
            updateProjectProgress(result2.rows[0].project_id, (err, result3) => {
              if (err) {
                cb(err);
              } else {
                cb(null, result.rows[0].progress);
              }
            });
          });
        }
      });
    }
  });
};

const getProjectLabels = (projectId, cb) => {
  const sql = {
    text: `SELECT * FROM labels WHERE project_id=$1`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const addLabelToProject = (title, color, projectId, cb) => {
  const sql = {
    text: `INSERT INTO labels (project_id,title,color) VALUES ($1,$2,$3)`,
    values: [projectId, title, color] };
  connection.query(sql, cb);
};

const removeLabel = (labelId, projectId, cb) => {
  const sql = {
    text: `DELETE FROM labels WHERE id = $1 AND project_id=$2`,
    values: [labelId, projectId] };
  connection.query(sql, cb);
};

const getProjectStates = (projectId, cb) => {
  const sql = {
    text: `SELECT * FROM state WHERE project_id=$1`,
    values: [projectId] };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

module.exports = {
  addProject,
  addMember,
  getCurrentProjects,
  getFinishedProjects,
  getMemberByEmail,
  createBacklog,
  getAllProjects,
  getTasksByState,
  getProjectDetails,
  updateProjectProgress,
  updateSprintProgress,
  updateTaskProgress,
  getMemberInProject,
  getAllMembersInProject,
  getProjectName,
  invite,
  getCurrentSprints,
  getFinishedSprints,
  setTaskProgress,
  getProjectNameById,
  getProjectLabels,
  addLabelToProject,
  removeLabel,
  getProjectStates
};
