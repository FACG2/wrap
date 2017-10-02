const express = require('express');
const routes = require('./routes.js');
const router = express.Router();
const accessCheck = require('./helpers/index.js').auth.accessCheck;

router.get('/', routes.getHome);
router.get('/projects/:project_id', accessCheck('member'), routes.getProjectPage);
router.get('/getUsersTasks', routes.getUsersTasks);
router.get('/getDashboard', routes.getDashboard);
router.get('/:project_id/tasks/:task_id', routes.getTask);
router.get('/currentProjects', routes.getCurrentProjects);
router.get('/finishedProjects', routes.getFinishedProjects);
router.get('/logout', routes.getLogout);
router.get('/stateTasks/:state_id', routes.getStateTasks);// ////
router.get('/projects/:project_id/currentSprint', routes.getCurrentSprint);
router.get('/projects/:project_id/stateTasks/:state_id', routes.getStateTasks);
router.get('/projects/:project_id/backlogTasks', routes.getBacklogTasks);
router.get('/:project_id/tasks/:task_id/features', routes.getFeatures);
router.get('/:project_id/tasks/:task_id/comments', routes.getComments);
router.get('/projects/:project_id/logs', routes.getLogs);
router.get('/projects/:project_id/members', routes.getMembers);
router.get('/:project_id/tasks/:task_id/progress', routes.getProgress);
router.get('/:project_id/tasks/:task_id/assignMember', routes.getAssignMember);
router.post('/signUp', routes.postSignup);
router.post('/login', routes.postLogin);
router.post('/addProject', routes.postAddProject);
router.post('/projects/:project_id/addTask', routes.postAddTask);
router.post('/projects/:project_id/createSprint', routes.postCreateSprint);
router.post('/:project_id/tasks/:task_id/addFeature', routes.postAddFeature);
router.post('/:project_id/tasks/:task_id/addComment', routes.postAddComment);
router.post('/projects/:project_id/addMember', routes.postAddMember);
router.post('/projects/:project_id/setState', routes.postSetState);
router.post('/projects/:project_id/moveToBacklog', routes.postMoveToBacklog);
router.post('/:project_id/tasks/:task_id/assignMember', routes.postAssignMember);
router.post('/:project_id/tasks/:task_id/:feature_id', routes.postCheckFeature);

module.exports = router;
