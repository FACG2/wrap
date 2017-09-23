const connection = require('../database/db_connection.js');
const users = require('./helpers/users.js');
require('env2')('./config.env');
// const helperUser = require('../../routes/helpers/users.js');
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

getCurrentProjects(1,(err,res)=>{
  if (err) {
    console.log(err);
  }
  else {
    console.log(res);
  }
});

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
      cb(null, res);
    }
  });
};

const getAllMembersInProject = (projectId, cb) => {
  const sql = {
    text: `SELECT * FROM user_project WHERE project_id = $1`,
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

const addMember = (userId, projectId, role, cb) => {
  getMemberInProject(userId, projectId, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length > 0) {
        // / existed user
        cb('User is existed in the project');
      } else {
        const sql = {
          text: `INSERT INTO user_project (user_id,project_id,role) VALUES ($1,$2,$3) RETURNING *`,
          values: [userId, projectId, role]
        };
        connection.query(sql, (error, result) => {
          if (error) {
            cb(error);
          } else {
            cb(null, result.row);
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
          cb(null, project.rows[0]);
        }
      });
    }
  });
};

//
// // // add member to the project or invite then add the log where the action type will be add or invite
// const addMember = (adminId, userEmail, projectId, role, cb) => {
//   getMemberByEmail(userEmail, projectId, (err, res) => {
//     console.log(res);
//     if (err) {
//       cb(err);
//     } else {
//       if (res.rows.length > 0) {
//         // / existed user in the project
//         cb('User is existed in the project');
//       } else {
//         helperUser.existedEmail(userEmail, (erorr, response) => {
//               if (err && !response) {
//                 cb(err)
//               }
//               else {
//
//               }
//                 // //// user is not exist in the data base >> invite
//             invite(adminId, userEmail, projectId, (error, invited) => {
//               if (error) {
//                 cb(error);
//               }
//               // else {
//               //   cb(null, invited);
//               // }
//             });
//           } else {   // // user is not exist in the project >> add
//             const sql = {
//               text: `INSERT INTO user_project (user_id,project_id,role) VALUES ($1,$2,$3) RETURNING *`,
//               values: [res.rows[0].id, projectId, role]
//             };
//             connection.query(sql, (error, result) => {
//               if (error) {
//                 cb(error);
//               } else {
//                 cb(null, result.row);
//               }
//             });
//           }
//         });
//       }
//     }
//   });
// };
//

module.exports = {
  addProject,
  getCurrentProjects,
  getFinishedProjects,
  getAllProjects,
  getTasksByState,
  getProjectDetails
};
