// const test = require('tape');
// const supertest = require('supertest');
// const app = require('../src/app.js');
// test('home page test', (t) => {
//   supertest(app)
//       .get('/')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) {
//           t.notOk(false);
//         } else {
//           t.equal(res.status, 200, 'equal');
//         }
//         t.end();
//       });
// });
//
// test('post data test', (t) => {
//   var obj = {username: 'qamar', context: 'haahah'};
//   supertest(app)
//       .post('/new')
//       .send(obj)
//       .expect(302)
//       .end(function (err, res) {
//         if (err) {
//           t.notOk(err);
//         } else {
//           console.log('heba', res);
//           t.equal(res.body.username, 'qamar', 'equal');
//         }
//         t.end();
//       });
// });
// test.onFinish(() => process.exit(0));
