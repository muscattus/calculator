import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import HistoryService from '../history/History'


router.post('/evaluate', jsonParser, async (req: Request, res: Response, next: NextFunction) => {
  const equation = req.body.equation;
  try {
    const match = await HistoryService.getMatchingEntry(equation, res);
    const result = match[0]?.calculatedresult || evaluate(equation)
    const insertResult = await HistoryService.save(req.body.equation, result);
    const isLogged = insertResult && insertResult?.length;
    res.json({result, isLogged});
  } catch (error: any) {
    next(ApiError.internalError(error.message, error.name));
  }
})

export default router;