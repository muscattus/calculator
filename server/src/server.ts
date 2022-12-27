
import express from 'express';
import { handleError } from './calculator/errors/handle-error';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
const app = express();
import baseRouter from './routes/index';

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