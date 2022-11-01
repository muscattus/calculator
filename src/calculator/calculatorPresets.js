import { numberPattern } from "./constants/constants";
import { operations as allOperations } from "./operations";

export const calculatorPresets = {};

setupCalculator();

function setupCalculator() {
  calculatorPresets.operations = getOperations(allOperations);
  calculatorPresets.operators = Object.keys(calculatorPresets.operations);
  calculatorPresets.operatorsRegexpPattern = getOperatorsRegexpString(calculatorPresets.operators);
  calculatorPresets.operatorsRegexp = new RegExp(calculatorPresets.operatorsRegexpPattern, 'g');
  calculatorPresets.negativeRegexp = getNegativeRegexp(calculatorPresets.operatorsRegexpPattern);
  calculatorPresets.validationRegexp = getValidationRegexp(calculatorPresets.operatorsRegexpPattern);
}


function getOperations(operations) {
  const calculatorOperations = {};
  operations.forEach(operation => {
    calculatorOperations[operation.operator] = operation;
  })
  return calculatorOperations;
};

function getOperatorsRegexpString(operators) {
  const escapedOperators = operators.map(operator => {
    if (operator.length === 1) {
      return`\\${operator}`;
    } else {
      return operator
    }
  })
  const operatorsString = `(${escapedOperators.join('|')})`;
  return operatorsString;
}

function getNegativeRegexp (operatorsRegexpPattern) {
  const operatorsPattern = `((?<=${operatorsRegexpPattern})-(?=\\d+))|(^-)`;
  const operatorsRegexp = new RegExp(operatorsPattern, 'g');
  return operatorsRegexp;
}

function getValidationRegexp(operatorsRegexpPattern) {
  const pattern = `^(${numberPattern}|${operatorsRegexpPattern}|\\(|\\))+$`;
  const validationRegexp = new RegExp(pattern);
  return validationRegexp
}