const {Pool} = require('pg');
require('env2')('./config.env');
if (!process.env.HEROKU_POSTGRESQL_BLACK_URL) {
  throw new Error('No DATABASE_URL provided');
}

const pool = new Pool({ connectionString: process.env.HEROKU_POSTGRESQL_BLACK_URL });

module.exports = pool;
