const jwt = require('jsonwebtoken');

function addToken (res, id, username, avatar) {
  const token = jwt.sign({id, username, avatar}, 'wrap shhh');
  res.cookie('token', token);
}

function removeToken (req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, 'wrap shhh', (err, user) => {
    if (err) {
      return res.render('error.hbs', {message: 'Access is denied, Please login'});
    } else {
      return res.cookie('token', '', {maxAge: 0});
    }
  });
}
module.exports = {
  addToken,
  removeToken
};
