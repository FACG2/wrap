const jwt = require('jsonwebtoken');
const queries = require('../../queries/index.js');

const loginCheck = (req, res, next) => {
  const url = req.url;
  const token = req.cookies.token;
  if (!token) {
    if (url === '/' || url === '/login' || url === '/signup') {
      return next();
    }
    return next(new Error('Access is denied!, please login..'));
  } else {
    jwt.verify(token, 'wrap shhh', (err, user) => {
      if (err) {
        res.cookie('token', '', {maxAge: 0});
        return next(new Error('Access is denied!, please login..'));
      } else {
        req.user = user;
        return next();
      }
    });
  }
};
const calcRole = {
  'user': 1,
  'member': 2,
  'admin': 3
};
const accessCheck = (minRole) => (req, res, next) => {
  const projectId = req.params.project_id;
  queries.users.getRole(req.user.id, projectId, (err, result) => {
    if (err || result.rows.length === 0) {
      next(new Error('Access is denied!'));
    } else {
      const userRole = result.rows[0].role;
      if (calcRole[userRole] && calcRole[userRole] >= calcRole[minRole]) {
        next();
      } else {
        next(new Error('Access is denied!'));
      }
    }
  });
};

module.exports = {
  loginCheck,
  accessCheck
};
