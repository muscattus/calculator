const {regexpStrings} = require('../constants/constants');
// import {regexpStrings} from '../constants/constants.js';
const presets = require('../calculatorPresets');
// import { calculatorPresets as presets } from '../calculatorPresets.js';

/**
 * Replaces all '-' (minus) signs for negative numbers with 'neg' string so
 * that it is not confused with minus operator.
 * 
 * @param {string} equation string
 * @returns {string} equation string with replaced signs
 */
function replaceNegative(equation) {
  const equationWithReplacedNegative =  equation.replaceAll(presets.negativeRegexp, regexpStrings.negative);
  return equationWithReplacedNegative;
}

/**
 * Finds the subexpression that needs to be calculated first based on the
 * operator.
 * 
 * @param {string} current operator 
 * @param {string} the whole equation 
 * @returns {string} statement in string format
 */
function getExpression(operator, equation) {
  const escOperator = operator.length > 1 ? operator : `\\${operator}`;
  const expressionPattern = presets.operations[operator].unary ?
  `${escOperator}${regexpStrings.number}` :
  `${regexpStrings.number}${escOperator}${regexpStrings.number}`;
  return equation.match(expressionPattern)[0];
}

/**
 * Validates if equation contains unexpected characters or unknown operators.
 * 
 * @param {string} equation
 * @throws {ValidationError} if string is not valid
 * @returns {boolean} If string is valid
 */
function validateEquation(equation) {
  return presets.validationRegexp.test(equation)
}

module.exports = {
  getExpression,
  validateEquation,
  replaceNegative
}