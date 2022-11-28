import { Router } from 'express';
import { operations } from '../calculator/operations/index';
import presets from '../calculator/calculatorPresets';
const bodyParser = require('body-parser');
import  { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const operationsJson = operations;
  const validationRegexpJson = presets.operatorsPattern;
  // console.log(JSON.stringify({operations: operationsJson, regexp: validationRegexpJson}));
  res.json(JSON.stringify({operations: operationsJson, regexp: validationRegexpJson}));
})

export default router;