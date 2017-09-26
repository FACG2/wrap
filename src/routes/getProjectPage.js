module.exports = (req, res, next) => {
  const data = {project_id: req.params.project_id};
  data.user = req.user;
  data.scriptName = 'project';
  res.render('project.hbs', data);
};
