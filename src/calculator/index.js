import { regexpPatterns as rePatterns, regexpStrings as reStrings, regexp as re}from "./constants/constants";
import { calculatorPresets as presets } from "./calculatorPresets";
import { ValidationError } from "./errors/ValidationError";
import { errorMessages as errors } from "./errors/errorMessages";
import { replaceNegative, getExpression, validateEquation } from "./helpers/helpers";

/**
 * Validates and executes the equation.
 * 
 * @param {string} equation string
 * @returns {string} calculated value in string format
 */
export function evaluate(equation) {    
  if (!validateEquation(equation)){
    throw new ValidationError(errors.invalidInput);
  }
  const equationWithoutBrackets = handleBrackets(equation);
  return calculate(equationWithoutBrackets);
}

/**
 * Checks if equations contains brackets and handles the correct order
 * of executing operations by calculating expressions in brackets first.
 * 
 * @param {string} equation string
 * @returns {string} partially calculated equation string
 */
function handleBrackets(equation) {
  if (!equation.match(rePatterns.brackets)){
    return equation;
  }
  try {
    const equationInBrackets = equation.match(re.brackets)[0];
    const resultInBrackets = calculate(equationInBrackets);
    const newEquation = equation.replace(`(${equationInBrackets})`, resultInBrackets);
    return handleBrackets(newEquation);
  } catch {
    throw new ValidationError(errors.invalidBrackets);
  }
}

/**
 * Solves the equation without brackets.
 * 
 * @param {string} equation string
 * @returns {string} calculated result in string format
 */    
function calculate(equation) {
  const equationWithReplacedNegative = replaceNegative(equation);
  if(rePatterns.negNumber.test(equationWithReplacedNegative)){
      return equationWithReplacedNegative.replace(rePatterns.negative, reStrings.minus);
  }
  const allOperators = equationWithReplacedNegative.match(presets.operatorsRegexp);
  const currentOperator = getPriorityOperator(allOperators);
  const expression = getExpression(currentOperator, equationWithReplacedNegative);
  const expressionResult = calculateExpression(currentOperator, expression);
  const newEquation = equationWithReplacedNegative.replace(expression, expressionResult);
  return calculate(newEquation);
}
    
/**
 * Finds the operator that needs to be executed first.
 * 
 * @param {string[]} array of all operators in the equation 
 * @returns {string} operator to be executed first
 */
function getPriorityOperator(allOperators) {
  let operatorToExecute = allOperators[0];
  for(let i = 1; i < allOperators.length; i++) {
    const operator = allOperators[i];
    if(presets.operations[operator].priority > presets.operations[operatorToExecute].priority) {
      operatorToExecute = operator;
    } else {
      return operatorToExecute;
    }
  }
  return operatorToExecute;
}

/**
 * Solves the expression with a single operation.
 * 
 * @param {string} current operator 
 * @param {string} string that represents current operation 
 * @returns {string} calculated result in string format
 */
function calculateExpression(operator, expression) {
  let operands = expression.match(re.allNumbers);
  const operation = presets.operations[operator];
  operands = operands.map(operand => operand.replace(rePatterns.negative, reStrings.minus));
  return operation.calculate(...operands);
}


