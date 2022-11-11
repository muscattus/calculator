import { Router } from 'express';
import { operations } from '../calculator/operations/index';
const bodyParser = require('body-parser');
import  { Request, Response } from 'express';
const jsonParser = bodyParser.json()

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const operationsJson = JSON.stringify(operations);
  res.json(operationsJson);
})

export default router;