const { regexpStrings } = require("./constants/constants");
const allOperations = require("./operations/index");

const calculatorPresets = {};

setupCalculator();

function setupCalculator() {
  calculatorPresets.operations = getOperations(allOperations);
  calculatorPresets.operators = Object.keys(calculatorPresets.operations);
  const operatorsPattern = getOperatorsString(calculatorPresets.operators);
  calculatorPresets.operatorsRegexp = new RegExp(operatorsPattern, 'g');
  calculatorPresets.negativeRegexp = getNegativeRegexp(operatorsPattern);
  calculatorPresets.validationRegexp = getValidationRegexp(operatorsPattern);
}


function getOperations(operations) {
  return operations.reduce((calculatorOperations, operation) => {
    calculatorOperations[operation.operator] = operation;
    return calculatorOperations;
  }, {});
};

function getOperatorsString(operators) {
  const escapedOperators = operators.map(operator => {
    return operator.length === 1 ? `\\${operator}` : operator
  })
  const operatorsString = `(${escapedOperators.join('|')})`;
  return operatorsString;
}

function getNegativeRegexp (operators) {
  const operatorsPattern = `((?<=${operators})-(?=\\d+))|(^-)`;
  const operatorsRegexp = new RegExp(operatorsPattern, 'g');
  return operatorsRegexp;
}

function getValidationRegexp(operatorsRegexpPattern) {
  const pattern = `^(${regexpStrings.number}|${operatorsRegexpPattern}|\\(|\\))+$`;
  const validationRegexp = new RegExp(pattern);
  return validationRegexp
}

module.exports = calculatorPresets;