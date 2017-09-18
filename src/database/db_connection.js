const {Pool} = require('pg');
require('env2')('./config.env');
if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL provided');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = pool;
