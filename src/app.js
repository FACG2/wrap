const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes/index');
const helpers = require('./views/helpers/index');
const auth = require('./routes/helpers/index').auth;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.use(
  express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' })
);
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: helpers
  })
);

app.use(auth.loginCheck);
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error.hbs', {
    message: err.message,
    error: {}
  });
});
app.use((req, res) => {
  res.status(404).render('404.hbs');
});
app.set('port', process.env.PORT || 4000);

module.exports = app;
