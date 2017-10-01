const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');

test('get task details', t => {
  supertest(app)
      .get(`/tasks/1`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          t.notOk(err);
        } else {
          t.same(res.statusCode, 200, 'Status code is 200');
          t.end();
        }
      });
});
test('get project details', t => {
  supertest(app)
      .get(`/projects/1`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          t.notOk(err);
        } else {
          t.same(res.statusCode, 200, 'Status code is 200');
          t.end();
        }
      });
});
test('get dashboard', (t) => {
  supertest(app)
      .get('/getDashboard')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          t.notOk(err);
        } else {
          t.equal(res.statusCode, 200, '200 status code');
          t.end();
        }
      });
});

test('view finished projects', (t) => {
  supertest(app)
      .get('/finishedProjects')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          t.notOk(err);
        } else {
          t.equal(res.statusCode, 200, '200 status code');
          t.end();
        }
      });
});
