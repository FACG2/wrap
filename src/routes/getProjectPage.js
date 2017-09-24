module.exports = (req, res, next) => {
  const data = {project_id: req.params.project_id};
  data.user = req.user;
  res.render('project.hbs', data);
};
