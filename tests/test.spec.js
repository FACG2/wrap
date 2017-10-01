const user = require('../src/queries/helpers/users.js');
const test = require('tape');
// const app = require('../src/app');
const functions = require('../src/queries/index.js');

test('1 + 1 = 2', t => {
  t.plan(1);
  t.equal(1 + 1, 2);
});

test('compare passward', t => {
  t.plan(1);
  var hashed = user.hashPassword('123456');
  var actual = user.comparePassword('123456', hashed);
  var expected = true;
  // console.log(user.comparePassword("123456",hashed));

  t.equal(expected, actual, 'eaual');
});

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
      console.log(res.rows[0].role);
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

test('Return the number of tasks for the user', (t) => {
  functions.tasks.getTasksByUserId(5, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var actual = res.length;
      var expected = 9;
      t.deepEqual(actual, expected, 'should return the number of the tasks assigned for the entered user ');
      t.end();
    }
  });
});

test('Return the number of tasks for the user', (t) => {
  functions.tasks.getTaskDetails(1, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var expected = { id: 1,
        title: 'task5',
        description: 'No description',
        priority: 1,
        deadline: 'Not specified',
        duration: -1,
        assigned_id: 7,
        username: 'qhqh',
        project_id: null,
        sprint_id: 1,
        state_id: 20,
        name: 'In-progress' };

      var actual = res;
      t.deepEqual(actual, expected, 'should return the task details ');
      t.end();
    }
  });
});
// getStateByName = (stateName, projectId,

test('Return the state', (t) => {
  functions.tasks.getStateByName('backlog', 20, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var expected = 55;
      var actual = res;
      t.deepEqual(actual, expected, 'should return the task details ');
      t.end();
    }
  });
});

test('Return the project tasks', (t) => {
  functions.tasks.getCurrentTasks(5, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var expected = 9;
      var actual = res.length;
      t.deepEqual(actual, expected, 'should return the task details ');
      t.end();
    }
  });
});
