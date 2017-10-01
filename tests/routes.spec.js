const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ3IiwiYXZhdGFyIjoiaHR0cDovL3d3dy5jaGVhcC1hY2NvdW50YW50cy1pbi1sb25kb24uY28udWsvd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDcvVXNlci1BdmF0YXIucG5nIiwiaWF0IjoxNTA2ODQ4NjAyfQ.9rjIuJHTqeTbUSvYxZLCMSW7eK387IRE1aX1oU0WkM8

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
