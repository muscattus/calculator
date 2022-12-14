import * as dotenv from 'dotenv';

const envName = process.env.NODE_ENV?.trim();
dotenv.config({path:__dirname+`/environments/.env.${envName}`});

export const db = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
  }
  // connection: 'postgres://postgres:calcpostgres@localhost:5432/postgres'
});