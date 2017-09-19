const express = require('express');
const routes = require('./routes.js');
const router = express.Router();

router.get('/', routes.getHome);
router.post('/signUp', routes.postSignup);
// router.get('/', (req, res, next) => {
//   queries.allMessages((err, dbRes) => {
//     if (err) {
//       next(err);
//     } else {
//       res.status(200);
//       res.render('home.hbs', {allMessages: dbRes});
//     }
//   });
// });
// router.get('/update', (req, res, next) => {
//   queries.allMessages((err, dbRes) => {
//     if (err) {
//       next(err);
//     } else {
//       res.render('partials/allMessages', {allMessages: dbRes, layout: false});
//     }
//   });
// });
//
// router.post('/new', (req, res, next) => {
//   if (req.body.username.trim().length > 1 && req.body.context.trim().length > 1) {
//     queries.storeMessage(req.body.username, req.body.context, (err, rows) => {
//       if (err) {
//         next(err);
//       }
//     });
//   }
//   res.status(302);
//   res.redirect('/');
// });

module.exports = router;
