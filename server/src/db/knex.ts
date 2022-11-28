
import setup from './constants';

export const pg = require('knex')({
  client: 'postgres',
  connection: {
    host: setup.DB_HOST,
    port: setup.DB_PORT,
    password: setup.DB_PASSWORD,
    database: setup.DB_NAME,
    user: setup.DB_USER
  }
  // connection: 'postgres://postgres:calcpostgres@localhost:5432/postgres'
});