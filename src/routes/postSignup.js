const tokenHandler = require('../views/helpers/token.js');
const functions = require('../queries/index.js');

module.exports = (req, res, next) => {
  functions.users.signUp(req.body.username, req.body.githubname, req.body.password, (err, result) => {
    if (err) {
      next(err);
    } else {
<<<<<<< HEAD
      const tempToken = {id: result.id, username: result.username, avatar: result.avatar};
      const token = jwt.sign(tempToken, 'wrap shhh');
      res.cookie('token', token);

      functions.projects.getAllProjects(result.id, (projectErr, projects) => {
        if (projectErr) {
          next(projectErr);
        } else {
          functions.projects.getTasksByUserId(result.id, (tasksErr, tasks) => {
            if (tasksErr) {
              next(tasksErr);
            } else {
              functions.projects.getCurrentTasks(result.id, (cTasksErr, currentTasks) => {
                if (cTasksErr) {
                  next(cTasksErr);
                } else {
                  res.render('dashboard.hbs', {noOfAllTasks: tasks.rows.length, noOfCurrentTasks: currentTasks.rows.length, noOfAllProjects: projects.row.length});
                }
              });
            }
          });
        }
      });
=======
      tokenHandler.addToken(res, result.id, result.username, result.avatar);
      res.render('dashboard.hbs');
>>>>>>> ba4e6422673ba639bd414378526b18e8fe7fd8c1
    }
  });
};
