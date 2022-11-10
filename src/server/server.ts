
// import { PORT, ORIGIN_URL } from './constants/constants';
// const { PORT, ORIGIN_URL } = require('./constants/constants')
// const express = require('express');
import express from 'express';
// const PORT = require('./constants/basePort');
// import {PORT} from './constants/basePort.js';
// const ORIGIN_URL = require('./constants/originUrl');
// import {ORIGIN_URL} from './constants/originUrl.js';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
// import cors from "cors";
// const calculatorRouter = require('./routes/calculator');
import calculatorRouter from './routes/calculator';
const app = express();


const corsOptions = {
  origin: ORIGIN_URL
};

app.use(cors(corsOptions));
app.use('/calculator', calculatorRouter);


app.listen(PORT, () => {
  console.log('port', PORT);
  console.log('orig', ORIGIN_URL);
  console.log(`App is working at http://${PORT}`);
})