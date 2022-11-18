import { ApiError } from './../calculator/errors/ApiError';
import { Router } from 'express';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response, NextFunction } from 'express';
const jsonParser = bodyParser.json();
const router = Router();

router.post('/evaluate', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const equation = req.body.equation;
  try {
    const result = evaluate(equation);
    res.json({result});
  } catch (error: any) {
    next(ApiError.badRequest(error.message, error.name));
  }
})

export default router;