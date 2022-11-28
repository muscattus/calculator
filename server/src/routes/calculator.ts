import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();
import { db } from '../db/calculator_db';


router.post('/evaluate', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const equation = req.body.equation;
  try {
    const result = evaluate(equation);
    db.findMatch(equation);
    db.log(req.body.equation, result);
    res.json({result});
  } catch (error: any) {
    next(ApiError.badRequest(error.message, error.name));
  }
})

router.get('/persons', (req: Request, res: Response) => {
  return db.getLast(5, res);
})

export default router;