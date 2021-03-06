const express = require('express');
const routes = require('./routes.js');
const router = express.Router();
const accessCheck = require('./helpers/index.js').auth.accessCheck;

router.get('/', routes.getHome);
router.get('/projects/:project_id', accessCheck('member'), routes.getProjectPage);
router.get('/getUsersTasks', routes.getUsersTasks);
router.get('/getDashboard', routes.getDashboard);
router.get('/:project_id/tasks/:task_id', accessCheck('member'), routes.getTask);
router.get('/currentProjects', routes.getCurrentProjects);
router.get('/finishedProjects', routes.getFinishedProjects);
router.get('/logout', routes.getLogout);
router.get('/projects/:project_id/stateTasks/:state_id', accessCheck('member'), routes.getStateTasks);
router.get('/:project_id/tasks/:task_id/labels', accessCheck('member'), routes.getTaskLabels);
router.get('/projects/:project_id/currentSprint', accessCheck('member'), routes.getCurrentSprint);
router.get('/projects/:project_id/stateTasks/:state_id', accessCheck('member'), routes.getStateTasks);
router.get('/projects/:project_id/backlogTasks', accessCheck('member'), routes.getBacklogTasks);
router.get('/:project_id/tasks/:task_id/features', accessCheck('member'), routes.getFeatures);
router.get('/:project_id/tasks/:task_id/comments', accessCheck('member'), routes.getComments);
router.get('/projects/:project_id/logs', accessCheck('member'), routes.getLogs);
router.get('/projects/:project_id/members', accessCheck('member'), routes.getMembers);
router.get('/:project_id/tasks/:task_id/progress', accessCheck('member'), routes.getProgress);
router.get('/:project_id/tasks/:task_id/assignMember', accessCheck('member'), routes.getAssignMember);
router.get('/:project_id/tasks/:task_id/members', accessCheck('member'), routes.getProjectMembers);
router.get('/projects/:project_id/labels', accessCheck('member'), routes.getProjectLabels);
router.get('/allUserProjects', routes.getUsersProjects);
router.post('/signUp', routes.postSignup);
router.post('/login', routes.postLogin);
router.post('/addProject', routes.postAddProject);
router.post('/projects/:project_id/addTask', accessCheck('member'), routes.postAddTask);
router.post('/projects/:project_id/createSprint', accessCheck('member'), routes.postCreateSprint);
router.post('/:project_id/tasks/:task_id/addFeature', accessCheck('member'), routes.postAddFeature);
router.post('/:project_id/tasks/:task_id/addComment', accessCheck('member'), routes.postAddComment);
router.post('/projects/:project_id/addMember', accessCheck('member'), routes.postAddMember);
router.post('/projects/:project_id/setState', accessCheck('member'), routes.postSetState);
router.post('/projects/:project_id/moveToBacklog', accessCheck('member'), routes.postMoveToBacklog);
router.post('/:project_id/tasks/:task_id/assignMember', accessCheck('member'), routes.postAssignMember);
router.post('/:project_id/tasks/:task_id/changePriority', accessCheck('member'), routes.postPriority);
router.post('/:project_id/tasks/:task_id/:feature_id', accessCheck('member'), routes.postCheckFeature);
router.post('/projectNav', routes.postProjectNav);

module.exports = router;
