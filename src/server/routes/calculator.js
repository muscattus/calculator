const Router = require('express');
// import { Router } from 'express';
const router = Router();
const operations = require('../calculator/operations/index');
const bodyParser = require('body-parser');
const evaluate = require('../calculator/index');

const jsonParser = bodyParser.json()

router.get('/operations', (req, res) => {
  const operationsJson = JSON.stringify(operations);
  res.json(operationsJson);
})

router.post('/evaluate', jsonParser, (req, res) => {
  console.log('evaluate');
  const equation = req.body.eq;
  const result = evaluate(equation);
  console.log(evaluate(equation));
  res.json({result});
})

module.exports = router;
// export default router;