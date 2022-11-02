import { allNumbersRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, negativePattern, parenthesesPattern,
    minus,
    errors}from "./constants/constants";
import { calculatorPresets as presets } from "./calculatorPresets";
import { ValidationError } from "./errors/errors";

/**
 * Validate and execute the equation 
 * @param {string} equation string
 * @returns {string} calculated value in string format
 */
export function evaluate(equation) {    
  validateEquation(equation);
  const result = handleParentheses(equation);
  return result
}
    
/**
 * Replace all '-' (minus) signs for negative numbers with 'neg' string so that
 * it is not confused with minus operator
 * @param {string} equation string
 * @returns {string} equation string with replaced signs
 */
function replaceNegative(equation) {
  const equationWithReplacedNegative =  equation.replaceAll(presets.negativeRegexp, negativeString);
  return equationWithReplacedNegative;
}

/**
 * Handle the correct order of executing operations by calculating statements
 * in the parentheses first, and replacing them with the calculated value
 * @param {string} equation string
 * @returns {string} partially calculated equation string
 */
function handleParentheses(equation) {
  if (!equation.match(parenthesesPattern)){
    return calculate(equation);
  }
  let newEquation = equation;
  try {
    const partOfEquation = newEquation.match(parenthesesRegexp)[0];
    const result = calculate(partOfEquation);
    newEquation = newEquation.replace(`(${partOfEquation})`, result);
    return handleParentheses(newEquation);
  } catch {
    throw new ValidationError(errors.invalidParentheses);
  }
}

/**
 * Do the math and calculate the equation
 * @param {string} equation string
 * @returns {string} calculated result in string format
 */    
function calculate(equation) {
  const equationWithReplacedNegative = replaceNegative(equation);
  if(negNumberRegexp.test(equationWithReplacedNegative)){
      return equationWithReplacedNegative.replace(negativePattern, minus);
  }
  const allOperators = equationWithReplacedNegative.match(presets.operatorsRegexp);
  const currentOperator = getCurrentOperator(allOperators);
  const currentOperation = getCurrentOperation(currentOperator, equationWithReplacedNegative);
  const result = calculateOperation(currentOperator, currentOperation);
  const newEquation = equationWithReplacedNegative.replace(currentOperation, result);
  return calculate(newEquation);
}
    
/**
 * Find the operator that needs to be executed first
 * @param {string[]} array of all operators in the equation 
 * @returns {string} operator to be executed first
 */
function getCurrentOperator(operators) {
  let currentOperator = operators[0];
  for(let i = 1; i < operators.length; i++) {
    const operator = operators[i];
    if(presets.operations[operator].priority > presets.operations[currentOperator].priority) {
      currentOperator = operator;
    } else {
      return currentOperator;
    }
  }
  return currentOperator;
}

/**
 * Do the math on the current operation (statement)
 * @param {string} current operator 
 * @param {string} string that represents current operation 
 * @returns {string} calculated result in string format
 */
function calculateOperation(operator, operationString) {
  let operands = operationString.match(allNumbersRegexp);
  const operation = presets.operations[operator];
  operands = operands.map(operand => {
    return operand.replace(negativePattern, minus);
  });
  const result = operation.calculate(...operands);
  return result;
}

/**
 * Find the statement that needs to be calculated first based on the operator
 * @param {string} current operator 
 * @param {string} the whole equation 
 * @returns {string} statement in string format
 */
function getCurrentOperation(operator, equation) {
  const escOperator = operator.length > 1 ? operator : `\\${operator}`;
  const pattern = presets.operations[operator].unary ?
      `${escOperator}${numberPattern}` :
      `${numberPattern}${escOperator}${numberPattern}`;
  return equation.match(pattern)[0];
}

/**
 * Validate if equation contains unexpected characters or unknown operators
 * @param {string} equation
 * @throws {ValidationError} if string is not valid
 * @returns {boolean} If string is valid
 */
function validateEquation(equation) {
  if (!presets.validationRegexp.test(equation)) {
    throw new ValidationError(errors.invalidInput);
  }
  return true
}

// function validateOperators(equation) {
//   if (!presets.validationRegexp.test(equation)) {
//     return false;
//   }
//   return true;
// }


