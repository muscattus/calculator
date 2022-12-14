import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import History from '../history/History'


router.post('/evaluate', jsonParser, async (req: Request, res: Response, next: NextFunction) => {
  const equation = req.body.equation;
  try {
    let result: string;
      result = await History.findMatch(equation, res);
    if (!result) {
        result = evaluate(equation);
    }
    const isLogged = await History.addEquationToHistory(req.body.equation, result);
    res.json({result, isLogged});
  } catch (error: any) {
    next(ApiError.internalError(error.message, error.name));
  }
})

export default router;