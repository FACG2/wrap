const jwt = require('jsonwebtoken');

function addToken (res, id, username, avatar) {
  const token = jwt.sign({id, username, avatar}, 'wrap shhh');
  res.cookie('token', token);
}
module.exports = {
  addToken
};
