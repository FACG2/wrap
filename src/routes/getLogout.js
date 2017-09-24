module.exports = (req, res, next) => {
  res.cookie('token', '', {maxAge: 0});
  res.redirect('/');
};
