
import express from 'express';
import { handleError } from './calculator/errors/handle-error';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
const app = express();
import baseRouter from './routes/index';
// import * as dotenv from 'dotenv';

// const envName = process.env.NODE_ENV?.trim();
// dotenv.config({path:__dirname+`./../environments/.env.${envName}`});
// // dotenv.config({path:__dirname+`./../environments/.env.`+process.env.NODE_ENV});
// // dotenv.config({path:__dirname+`./../environments/.env.production`});
// console.log(process.env.PORT);
// console.log(`dfff${process.env.NODE_ENV}3333`);
// console.log(typeof en);

const corsOptions = {
  origin: ORIGIN_URL
};

app.use(cors(corsOptions));
app.use('/api', baseRouter);
app.use(handleError);

app.listen(PORT, () => {
  console.log('port', PORT);
  console.log('orig', ORIGIN_URL);
  console.log(`App is working at http://${PORT}`);
});