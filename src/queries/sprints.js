const connection = require('../database/db_connection.js');
require('env2')('./config.env');

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

const getCurrentSprint = (projectId, cb) => {
  const sql = {
    text: `SELECT sprints.id, sprints.title, sprints.progress FROM sprints WHERE project_id= $1 AND closed = False`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err.message);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getSprintStates = (sprintId, cb) => {
  const sql = {
    text: `SELECT name FROM state WHERE sprint_id= $1`,
    values: [sprintId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getTasksByState = (stateId, cb) => {
  const sql = {
    // text: `SELECT * FROM tasks WHERE state_id=(SELECT state_id FROM state WHERE name=$1)`,
    text: `SELECT tasks.title,tasks.id AS task_id,tasks.progress,tasks.priority,users.username,users.avatar,labels.id AS label_id, labels.title AS label_title,labels.color FROM labels INNER JOIN tasks ON tasks.id = labels.task_id INNER JOIN users ON tasks.assigned_id=users.id WHERE tasks.state_id=$1`,
    values: [stateId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getTaskLabels =(taskId,cb)=>{
  const sql = {
    text: `SELECT * FROM labels WHERE task_id= $1`,
    values: [taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
}


getTasksByState(2, (err, rs) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rs);
  }
});



// const getTasksByStateName = (sprintId, stateName,cb) => {
//   const sql = {
//     text: `SELECT * FROM tasks INNER JOIN state ON state.id = tasks.state_id WHERE state.sprint_id=$1 AND state.name = (SELECT * FROM state WHERE sprint_id= $1)`,
//     values: [sprintId, stateName] };
//   connection.query(sql, (err, res) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, res.rows);
//     }
//   });
// };
// getTasksByStateName(1,'backlog',(err,rs)=>{
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log(rs);
//   }
// })

module.exports = {
  getAllSprints,
  getFinishedSprints,
  getCurrentSprint,
  getTasksByState,
  getSprintStates
};
