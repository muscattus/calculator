import {regexpStrings}  from './constants/constants';
import { operations as allOperations} from './operations/index';
import {Operations, DefaultOperation, CalculatorPresets } from "./constants/interfaces";

function setupCalculator(): CalculatorPresets {
  const operations = getOperations(allOperations);
  const operators = Object.keys(operations);
  const operatorsPattern = getOperatorsString(operators);
  const operatorsRegexp = new RegExp(operatorsPattern, 'g');
  const negativeRegexp = getNegativeRegexp(operatorsPattern);
  const validationRegexp = getValidationRegexp(operatorsPattern);
  return {
    operations,
    operators,
    operatorsRegexp,
    negativeRegexp,
    validationRegexp
  }
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

export default setupCalculator();
