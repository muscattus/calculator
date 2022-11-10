import { Router } from 'express';
import { operations } from '../calculator/operations/index';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response } from 'express';
const jsonParser = bodyParser.json()

const router = Router();

router.get('/operations', (req: Request, res: Response) => {
  const operationsJson = JSON.stringify(operations);
  res.json(operationsJson);
})

router.post('/evaluate', jsonParser, (req: Request, res: Response) => {
  const equation = req.body.eq;
  const result = evaluate(equation);
  res.json({result});
})

export default router;