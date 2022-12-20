import  HistoryService  from '../history/History';
import { historyLength } from './../constants/constants';
import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import { DBError } from '../calculator/errors/DBError'


router.get('/', jsonParser, async (req: Request, res: Response) => {
  try {
    const historyLog = await HistoryService.get(historyLength);
    res.json({history: historyLog.reverse()});
  } catch {
    res.status(500).json(DBError.historyError())
  }
})

export default router;