// const { regexpStrings } = require("./constants/constants");
import {regexpStrings}  from './constants/constants';
// const allOperations = require("./operations/index");
import { operations as allOperations} from './operations/index';
import {Operations, DefaultOperation, CalculatorPresets } from "./constants/interfaces";

// let calculatorPresets: CalculatorPresets;
const calculatorPresets: any = {};

setupCalculator();

function setupCalculator(): void {
  calculatorPresets.operations = getOperations(allOperations);
  calculatorPresets.operators = Object.keys(calculatorPresets.operations);
  const operatorsPattern = getOperatorsString(calculatorPresets.operators);
  calculatorPresets.operatorsRegexp = new RegExp(operatorsPattern, 'g');
  calculatorPresets.negativeRegexp = getNegativeRegexp(operatorsPattern);
  calculatorPresets.validationRegexp = getValidationRegexp(operatorsPattern);
}


function getOperations(operations: DefaultOperation[]): Operations {
  return operations.reduce((calculatorOperations: Operations, operation: DefaultOperation) => {
    const operator = operation.operator;
    calculatorOperations[operator] = operation;
    return calculatorOperations;
  }, {});
};

function getOperatorsString(operators: string[]): string {
  const escapedOperators = operators.map(operator => {
    return operator.length === 1 ? `\\${operator}` : operator
  })
  const operatorsString = `(${escapedOperators.join('|')})`;
  return operatorsString;
}

function getNegativeRegexp (operators: string): RegExp {
  const operatorsPattern = `((?<=${operators})-(?=\\d+))|(^-)`;
  const operatorsRegexp = new RegExp(operatorsPattern, 'g');
  return operatorsRegexp;
}

function getValidationRegexp(operatorsRegexpPattern: string): RegExp {
  const pattern = `^(${regexpStrings.number}|${operatorsRegexpPattern}|\\(|\\))+$`;
  const validationRegexp = new RegExp(pattern);
  return validationRegexp
}

export {calculatorPresets};
// module.exports = calculatorPresets;
// export {};