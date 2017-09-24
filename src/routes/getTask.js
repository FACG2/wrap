module.exports = (req, res, next) => {
  const data = {};
  data.user = req.user;
  res.render('task.hbs');
};
