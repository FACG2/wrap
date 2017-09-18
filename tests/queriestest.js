// const test = require('tape');
// const shot = require('shot');
// const fs = require('fs');
// const functions = require('../src/queries/functional_db.js');
//
// test('Add new message', (t) => {
//   var obj = {username: 'qamar', context: 'haahah'};
//   functions.storeMessage(obj.username, obj.context, (err, res) => {
//     var actual = res[0];
//     var expected = {'username': 'qamar', 'context': 'haahah'};
//     t.deepEqual(actual, expected, 'should return the intered object');
//     t.end();
//   });
// });
// 
// test('Display All Messages', (t) => {
//   functions.allMessages((err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       var actual = res[0];
//       var expected = {
//         username: 'Sami',
//         context: 'Hello world1'
//       };
//       // {weeks.num , weeks.week_title ,mentors.githubuser}
//       t.deepEqual(actual.username, expected.username, 'should return an the first user');
//       t.end();
//     }
//   });
// });
//
// test.onFinish(() => process.exit(0));
