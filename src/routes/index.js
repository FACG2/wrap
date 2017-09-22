const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/', routes.getHome);
router.get('/projects/:project_id', routes.getProjectPage);
router.post('/signUp', routes.postSignup);
router.post('/login', routes.postLogin);
router.post('/addProject', routes.postAddProject);
router.post('/addTask', routes.postAddTask);

module.exports = router;
