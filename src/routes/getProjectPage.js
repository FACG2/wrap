module.exports = (req, res, next) => {
  const data = {project_id: req.params.project_id};
console.log("heba",data);
  data.user = req.user;
  res.render('project.hbs', data);
};
