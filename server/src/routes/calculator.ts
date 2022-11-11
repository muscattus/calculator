import { Router } from 'express';
const bodyParser = require('body-parser');
import { evaluate } from '../calculator/index';
import  { Request, Response } from 'express';
const jsonParser = bodyParser.json()

const router = Router();

router.post('/evaluate', jsonParser, (req: Request, res: Response) => {
  const equation = req.body.equation;
  const result = evaluate(equation);
  res.json({result});
})

export default router;