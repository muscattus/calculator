
import express from 'express';
import { handleError } from './calculator/errors/handle-error';
import { PORT, ORIGIN_URL } from './constants/constants'
const cors = require('cors');
const app = express();
import baseRouter from './routes/index';
// import { initializeMongo } from './db/mongo/MongoOperations';

const corsOptions = {
  origin: ORIGIN_URL
};
// history.mongoose.connect('mongodb://localhost:27017/mongo').then(() => console.log('connected to mongo')).catch((e: any) => { console.log('not connected'); console.log(e)});

app.use(cors(corsOptions));

app.use('/api', baseRouter);
app.use(handleError);

app.listen(PORT, () => {
  console.log('port', PORT);
  console.log('orig', ORIGIN_URL);
  console.log(`App is working at http://${PORT}`);
});