
import express from 'express';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
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