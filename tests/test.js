const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
// test('Should be able to get a note by user id', t => {
//   const users = [1, 2, 3, 4];
//   users.forEach((user, index) => {
//     supertest(app)
//       .get(`/tasks/1`)
//       .expect(200)
//       .end((err, res) => {
//         t.same(res.statusCode, 200, 'Status code is 200');
//         t.error(err, 'No error');
//         if (users.length - 1 === index) {
//           t.end();
//         }
//       });
//   });
// });

test('get all notes test', t => {
  supertest(app)
      .get(`/projects/1`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          t.notOk(err);
        } else {
          t.end();
        }
      });
});

// test.onFinish(() => process.exit(0));
