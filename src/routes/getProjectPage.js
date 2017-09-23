module.exports = (req, res, next) => {
  res.render('project.hbs', {project_id: req.params.project_id});
};
