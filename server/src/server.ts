
import express from 'express';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
const app = express();
import baseRouter from './routes/index';


const corsOptions = {
  origin: ORIGIN_URL
};

app.use(cors(corsOptions));
app.use('/api', baseRouter);
app.get('/some/time', (req, res, next) => {
  console.log('first time');
  next();
})
app.get('/some/*', (req, res, next) => {
  console.log('second time');
  next();
})
app.get('/some/time', (req, res, next) => {
  console.log('third time');
})


app.listen(PORT, () => {
  console.log('port', PORT);
  console.log('orig', ORIGIN_URL);
  console.log(`App is working at http://${PORT}`);
})