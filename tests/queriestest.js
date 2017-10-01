
const test = require('tape');
// const app = require('../src/app');
const functions = require('../src/queries/index.js');

test('Get user id by the e-mail', (t) => {
  functions.users.getUserByEmail('qmff23@gmail.com', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var actual = res.id;
      var expected = 1;
      t.deepEqual(actual, expected, 'should return id of 1 ');
      t.end();
    }
  });
});

test('Get user role in project', (t) => {
  functions.users.getRole(1, 1, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var actual = res.rows[0].role;
      var expected = 'user';
      t.deepEqual(actual, expected, 'should return the user role in the specified project ');
      t.end();
    }
  });
});

test('Check the user is invited', (t) => {
  functions.users.checkInvitation('hanatj', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      console.log(res.id);
      var actual = res.id;
      var expected = 2;
      t.deepEqual(actual, expected, 'should return the user id if he is invited ');
      t.end();
    }
  });
});

//
// test('Check the user is invited', (t) => {
//   functions.tasks.getTasksByUserId(5, (err, res) => {
//     if (err) {
//       t.notOk(err);
//     } else {
//       console.log(res);
//       // console.log(res.id);
//       // var actual = res.id;
//       // var expected = 2;
//       t.deepEqual(actual, expected, 'should return the user id if he is invited ');
//       t.end();
//     }
//   });
// })
