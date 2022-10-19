import { allNumbersRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, negativePattern,
    minus, parentheses, errors } from "../constants/constants";
import { operations as allOperations } from "./operations/main";

export let config;

export function prepareCalculator() {
    const operations = getOperations(allOperations);
    const operators = Object.keys(operations);
    const operatorsRegexpPattern = getOperatorsRegexpString(operators);
    const operatorsRegexp = new RegExp(operatorsRegexpPattern, 'g');
    const negativeRegexp = getNegativeRegexp(operatorsRegexpPattern);
    const validationRegexp = getValidationRegexp(operatorsRegexpPattern);
    config = {
        operations,
        operators,
        operatorsRegexpPattern,
        operatorsRegexp,
        negativeRegexp,
        validationRegexp
    }
}


function getOperations(operations) {
    const calculatorOperations = {};
    operations.forEach(operation => {
        calculatorOperations[operation.symbol] = operation;
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
    const operatorsPattern = `(?<=${operatorsRegexpPattern})-(?=\\d+)`;
    const operatorsRegexp = new RegExp(operatorsPattern, 'g');
    return operatorsRegexp;
}

function getValidationRegexp(operatorsRegexpPattern) {
    const pattern = `^(${numberPattern}|${operatorsRegexpPattern}|\\(|\\))+$`;
    const validationRegexp = new RegExp(pattern);
    return validationRegexp
}