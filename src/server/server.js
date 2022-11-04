
// import { PORT, ORIGIN_URL } from './constants/constants';
const express = require('express');
// import express from 'express';
const PORT = require('./constants/basePort');
// import {PORT} from './constants/basePort.js';
const ORIGIN_URL = require('./constants/originUrl');
// import {ORIGIN_URL} from './constants/originUrl.js';
const cors = require('cors');
const calculatorRouter = require('./routes/calculator');
const app = express();


const corsOptions = {
  origin: ORIGIN_URL
};

app.use(cors(corsOptions));
app.use('/calculator', calculatorRouter);

// app.get('/operations', (req, res) => {
//   const operations = JSON.stringify([
//     {
//       symbol: '&#8730;',
//       operator: 'sqrt',
//       priority: 3,
//       unary: true,
//       additional: true,
//       calculate: function(a) {
//         return Math.sqrt(+a);
//       }
//     },
//     {
//       symbol: '^',
//       operator: '^',
//       priority: 3,
//       additional: true,
//       calculate: function(a, b) {
//         return Math.pow(a, b);
//       }
//     }]);
//     res.json(operations);
//   })


app.listen(3500, () => {
  console.log(PORT);
  console.log('App is working at http://3500');
})