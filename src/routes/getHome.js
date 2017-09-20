module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.render('login.hbs');
  } else {
    res.render('dashboard.hbs');
  }
};
