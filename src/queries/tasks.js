const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');
const project = require('./projects.js');

const getTasksByUserId = (userId, cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE assigned_id= $1`,
    values: [userId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
const getTaskDetails = (taskId, cb) => {
  const sql = {
    text: `SELECT tasks.id,tasks.title,tasks.description,tasks.priority,tasks.deadline,tasks.duration,tasks.assigned_id,users.username,tasks.project_id,tasks.sprint_id, tasks.state_id,state.name FROM tasks INNER JOIN users ON users.id = tasks.assigned_id INNER JOIN state ON state.id = tasks.state_id WHERE tasks.id= $1`,
    values: [taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getStateByName = (stateName, projectId, cb) => {
  const sql = {
    text: `SELECT id FROM state WHERE name= $1 AND project_id = $2`,
    values: [stateName, projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      console.log('errrrrrr', err);
      cb(err);
    } else {
      cb(null, res.rows[0].id);
    }
  });
};

const getProjectTasks = (projectId, state, cb) => {
  getStateByName(state, projectId, (error, stateId) => {
    if (error) {
      cb(error);
    } else {
      const sql = {
        text: `SELECT * FROM tasks WHERE project_id= $1 AND state_id=$2`,
        values: [projectId, stateId] };
      connection.query(sql, (err, res) => {
        if (err) {
          cb(err);
        } else {
          cb(null, res.rows);
        }
      });
    }
  });
};

const getCurrentTasks = (userId, cb) => {
  const sql = {
    text: `SELECT tasks.title,tasks.id,tasks.deadline,tasks.description,tasks.duration,tasks.priority,tasks.progress FROM tasks INNER JOIN state ON tasks.state_id=state.id WHERE tasks.assigned_id= $1 AND state.name != 'done'`,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

// / get the current tasks orderd by priority
const filterByPriority = (userId, cb) => {
  const sql = {
    text: `SELECT tasks.title,tasks.state_id,tasks.id,tasks.deadline,tasks.description,tasks.duration,tasks.priority,tasks.progress FROM tasks INNER JOIN state ON tasks.state_id=state.id WHERE tasks.assigned_id= $1 AND state.name != 'done' ORDER BY tasks.priority ASC `,
    values: [userId] };

  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const addComment = (userId, context, taskId, cb) => {
  const sql = {
    text: `INSERT INTO comments (user_id,context,task_id) VALUES ($1,$2,$3) RETURNING *`,
    values: [userId, context, taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows[0]);
    }
  });
};
// text: `UPDATE tasks SET assigned_id=$1 WHERE tasks.id=$2 RETURNING *`,

const assignMember = (memberName, taskId, cb) => {
  const sql = {
    text: `SELECT assigned_id FROM tasks WHERE id=$1`,
    values: [taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      if (result.rows[0].assigned_id === null) {
        const sql = {
          text: `SELECT users.id FROM users WHERE username =$1`,
          values: [memberName]
        };
        connection.query(sql, (error, memberId) => {
          if (error) {
            cb(error);
          } else {
            const sql2 = {
              text: `UPDATE tasks SET assigned_id=$1 WHERE id=$2 RETURNING *`,
              values: [memberId.rows[0].id, taskId]
            };
            connection.query(sql2, (error2, result2) => {
              if (error2) {
                cb(error2);
              } else {
                cb(null, result2.rows[0]);
              }
            });
          }
        });
      } else {
        cb('There is another member assigned');
      }
    }
  });
};

const removeAssign = (taskId, cb) => {
  const sql = {
    text: `UPDATE tasks SET assigned_id=null WHERE id=$1 RETURNING *`,
    values: [taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const deleteComment = (commentId, cb) => {
  const sql = {
    text: `DELETE FROM comments WHERE comments.id=$1`,
    values: [commentId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const calTaskOrder = (projectId, cb) => {
  getProjectTasks(projectId, 'backlog', (err, tasks) => {
    if (err) {
      cb(err);
    } else {
      if (tasks.length === 0) {
        cb(null, 0);
      } else {
        cb(null, tasks[tasks.length - 1].orders + 1);
      }
    }
  });
};
const addDefaultLabel = (taskId, projectId, cb) => {
  const sql = {
    text: `INSERT INTO labels (task_id,project_id,title,color) VALUES ($1,$2,$3,$4) `,
    values: [taskId, projectId, 'BUG', '#dc3545']
  };
  connection.query(sql, cb);
};

const listComments = (taskId, cb) => {
  const sql = {
    text: `SELECT comments.id,comments.user_id,comments.context,comments.date,users.username,users.avatar FROM comments INNER JOIN users ON users.id = comments.user_id WHERE task_id=$1`,
    values: [taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

const addTask = (title, priority, projectId, userId, cb) => {
  calTaskOrder(projectId, (error, order) => {
    if (error) {
      cb(error);
    } else {
      getStateByName('backlog', projectId, (err, stateId) => {
        if (err) {
          cb(err);
        } else {
          const sql = {
            text: `INSERT INTO tasks (assigned_id,title,priority,project_id,state_id,orders) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            values: [userId, title, priority, projectId, stateId, order] };
          connection.query(sql, (err, res) => {
            if (err) {
              console.log(err);
              cb(err);
            } else {
              addDefaultLabel(res.rows[0].id, projectId, (err2, res2) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, res.rows);
                }
              });
            }
          });
        }
      });
    }
  });
};

const getFeatures = (taskId, cb) => {
  const sql = {
    text: `SELECT * FROM features WHERE task_id=$1`,
    values: [taskId]
  };
  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows);
    }
  });
};

const addFeature = (title, taskId, cb) => {
  const sql = {
    text: `INSERT INTO features (title,finished,task_id) VALUES ($1,$2,$3) RETURNING *`,
    values: [title, false, taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      // project.updateTaskProgress(taskId, (err, rs) => {
      //   if (err) {
      //     cb(err);
      //   } else {
      //     cb(null, res.rows[0]);
      //   }
      // });
      cb(null, res.rows[0]);
    }
  });
};

const checkFeature = (featureId, state, cb) => {
  const sql = {
    text: `UPDATE features SET finished=$1 WHERE id=$2 RETURNING *`,
    values: [state, featureId] };

  connection.query(sql, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result.rows[0]);
    }
  });
};
const changeState = (sprintId, stateId, taskId, cb) => {
  const sql = {
    text: `UPDATE tasks SET state_id=$2, sprint_id=$1 WHERE id=$3 RETURNING *`,
    values: [sprintId, stateId, taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const moveToBacklog = (taskId, projectId, cb) => {
  const sql = {
    text: `SELECT id FROM state WHERE project_id= $1 AND name= 'backlog' `,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err || res.rows.length === 0) {
      cb(err);
    } else {
      const sql = {
        text: `UPDATE tasks SET state_id=$2 WHERE id=$1 AND project_id=$3 RETURNING *`,
        values: [taskId, res.rows[0].id, projectId]
      };
      connection.query(sql, (err2, taskDetails) => {
        if (err2) {
          cb(err2);
        } else {
          console.log('hana', res.state_id);
          cb(null, taskDetails.rows);
        }
      });
    }
  });
};

module.exports = {
  getCurrentTasks,
  getTasksByUserId,
  filterByPriority,
  addComment,
  deleteComment,
  listComments,
  getStateByName,
  getProjectTasks,
  calTaskOrder,
  addTask,
  assignMember,
  removeAssign,
  getTaskDetails,
  getFeatures,
  addDefaultLabel,
  addFeature,
  checkFeature,
  changeState,
  moveToBacklog

};
