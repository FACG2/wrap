const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');

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

const getStateByName = (stateName, cb) => {
  const sql = {
    text: `SELECT id FROM state WHERE name= $1`,
    values: [stateName] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0].id);
    }
  });
};

const getProjectTasks = (projectId, state, cb) => {
  getStateByName(state, (error, stateId) => {
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
    text: `SELECT tasks.title,tasks.id,tasks.deadline,tasks.description,tasks.duration,tasks.priority,tasks.progress FROM tasks INNER JOIN state ON tasks.state_id=state.id WHERE tasks.assigned_id= $1 AND state.name != 'done' ORDER BY tasks.priority ASC `,
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

const listComments = (taskId, cb) => {
  const sql = {
    text: `SELECT * FROM comments WHERE task_id=$1 `,
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
const addTask = (title, description, priority, deadline, duration, projectId, cb) => {
  calTaskOrder(projectId, (error, order) => {
    if (error) {
      cb(error);
    } else {
      getStateByName('backlog', (err, state_id) => {
        if (err) {
          cb(err);
        } else {
          const sql = {
            text: `INSERT INTO tasks (title,description,priority,deadline,duration,project_id,state_id,orders) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            values: [title, description, priority, deadline, duration, projectId, state_id, order] };
          connection.query(sql, (err, res) => {
            if (err) {
              cb(err);
            } else {
              cb(null, res.rows[0]);
            }
          });
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
  removeAssign
};
