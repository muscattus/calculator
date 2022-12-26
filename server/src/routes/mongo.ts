// import  HistoryService  from '../history/History';
// import { historyLength } from './../constants/constants';
// import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import { DBError } from '../calculator/errors/DBError';
// import{ History} from '../db/mongo/models/History';
const History = require('../db/mongo/models/History')


router.get('/', jsonParser, async (req: Request, res: Response) => {
  console.log('mongo get');
  try {
    const foundPosts = await History.find({});
    res.send({posts: foundPosts});
   } catch {
    res.status(500).json(DBError.historyError())
  }
})

export default router;