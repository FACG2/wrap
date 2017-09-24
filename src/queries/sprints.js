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


const getSprintStates = (sprintId,cb)=>{
  const sql = {
    text: `SELECT * FROM state WHERE sprint_id= $1`,
    values: [sprintId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
}

const getTasksByState = (stateName,cb) => {
  const sql = {
    text: `SELECT * FROM tasks WHERE state_id=(SELECT state_id FROM state WHERE name=$1)`,
    values: [stateName] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

getTasksByState('backlog',(err,rs)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(rs);
  }
})

module.exports = {
  getAllSprints,
  getFinishedSprints,
  getCurrentSprint,
  getTasksByState
};
