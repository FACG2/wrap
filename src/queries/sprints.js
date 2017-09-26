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
      cb(null, res.rows);
    }
  });
};

const getNoOfSprints = (projectId, cb) => {
  const sql = {
    text: `SELECT sprints.id FROM sprints WHERE project_id= $1`,
    values: [projectId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows.length + 1);
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

const getTaskLabels = (taskId, cb) => {
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
};

const addDefaultStates = (sprint_id, cb) => {
  const sql = {
    text: `INSERT INTO state (sprint_id,name)
          SELECT $1,x
          FROM  unnest(ARRAY['TODO', 'In-progress', 'Testing', 'done']) x`,
    values: [sprint_id] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const addSprint = (startingdate, duration, project_id, cb) => {
  getNoOfSprints(project_id, (err, sprintsNo) => {
    if (err) {
      cb(err);
    } else {
      const sql = {
        text: `INSERT INTO sprints (title,startingdate,duration,project_id) VALUES ($1,$2,$3,$4) RETURNING *`,
        values: ['SP - ' + sprintsNo, startingdate, duration, project_id] };
      connection.query(sql, (err, res) => {
        if (err) {
          cb(err);
        } else {
          addDefaultStates(res.rows[0].id, (err, result) => {
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
};


const addTaskToSprint = (taskId,sprintId,cb)=>{
  const sql = {
    text: `UPDATE tasks SET sprint_id=$1 WHERE id=$2`,
    values: [sprintId,taskId] };
  connection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}


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
  getSprintStates,
  addDefaultStates,
  getNoOfSprints,
  addSprint,
  addTaskToSprint
};
