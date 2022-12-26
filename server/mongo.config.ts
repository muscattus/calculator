import * as dotenv from 'dotenv';
const mongoose = require('mongoose');

const envName = process.env.NODE_ENV?.trim();
dotenv.config({path:__dirname+`/environments/.env.${envName}`});

export function initializeMongo() {
  mongoose.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_CLIENT}`)
  .then(() => console.log('connected to mongo'))
  .catch((e: any) => { console.log('not connected'); console.log(e)});
}