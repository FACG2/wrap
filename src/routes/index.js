const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/', routes.getHome);
router.get('/projects/:project_id', routes.getProjectPage);
router.get('/getUsersTasks', routes.getUsersTasks);
router.get('/getDashboard', routes.getDashboard);
router.get('/tasks/:task_id', routes.getTask);
router.get('/currentProjects', routes.getCurrentProjects);
router.get('/finishedProjects', routes.getFinishedProjects);
router.get('/logout', routes.getLogout);
router.get('/stateTasks/:state_id', routes.getStateTasks);
router.get('/projects/:project_id/currentSprint', routes.getCurrentSprint);
router.get('/projects/:project_id/stateTasks/:state_id', routes.getStateTasks);
router.get('/projects/:project_id/backlogTasks', routes.getBacklogTasks);
router.get('/tasks/:task_id/features', routes.getFeatures);
router.get('/tasks/:task_id/comments', routes.getComments);
router.get('/projects/:project_id/logs', routes.getLogs);
router.get('/projects/:project_id/members', routes.getMembers);
router.post('/signUp', routes.postSignup);
router.post('/login', routes.postLogin);
router.post('/addProject', routes.postAddProject);
router.post('/projects/:project_id/addTask', routes.postAddTask);
router.post('/projects/:project_id/createSprint', routes.postCreateSprint);
router.post('/tasks/:task_id/addFeature', routes.postAddFeature);
router.post('/tasks/:task_id/addComment', routes.postAddComment);

module.exports = router;
