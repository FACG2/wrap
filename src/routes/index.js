const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/', routes.getHome);
router.get('/projects/:project_id', routes.getProjectPage);
router.get('/getUsersTasks', routes.getUsersTasks);
<<<<<<< HEAD
=======
router.get('/getDashboard', routes.getDashboard);
router.get('/tasks/:task_id', routes.getTask);
>>>>>>> 4db80fa805326a079b9b69e924e5e7948736885f
router.post('/signUp', routes.postSignup);
router.post('/login', routes.postLogin);
router.post('/addProject', routes.postAddProject);
router.post('/addTask', routes.postAddTask);

module.exports = router;
