import { historyLength } from './../constants/constants';
import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import { db } from '../db/calculator_db';


router.get('/', jsonParser, async (req: Request, res: Response) => {
  try {
    const history = await db.getLast(historyLength);
    res.json({history: history.reverse()});
  } catch (e){
    console.log(e);
  }
})

export default router;