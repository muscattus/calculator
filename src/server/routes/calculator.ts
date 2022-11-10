// const Router = require('express');
import { Router } from 'express';
// const operations = require('../calculator/operations/index');
import { operations } from '../calculator/operations/index';
const bodyParser = require('body-parser');
// const evaluate = require('../calculator/index');
import { evaluate } from '../calculator/index';
// type { Request, Response} = require('express')
// const { Request, Response } = require('express');
import  { Request, Response } from 'express';
const jsonParser = bodyParser.json()

const router = Router();

router.get('/operations', (req: Request, res: Response) => {
  const operationsJson = JSON.stringify(operations);
  res.json(operationsJson);
})

router.post('/evaluate', jsonParser, (req: Request, res: Response) => {
  console.log('evaluate');
  const equation = req.body.eq;
  const result = evaluate(equation);
  // console.log(evaluate(equation));
  res.json({result});
})

// export = {};
// module.exports = router;
export default router;