import { allNumbersRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, negativePattern, parenthesesPattern,
    minus,
    errors}from "./constants/constants";
import { calculatorPresets as presets } from "./calculatorPresets";
import { ValidationError } from "./errors/errors";


export function evaluate(equation) {    
    validateEquation(equation);
    const result = handleParentheses(equation);
    return result
}
    
function replaceNegative(equation) {
    const equationWithReplacedNegative =  equation.replaceAll(presets.negativeRegexp, negativeString);
    return equationWithReplacedNegative;
}

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

function calculateOperation(operator, operationString) {
    let operands = operationString.match(allNumbersRegexp);
    const operation = presets.operations[operator];
    operands = operands.map(operand => {
        return operand.replace(negativePattern, minus);
    });
    const result = operation.calculate(...operands);
    return result;
}

function getCurrentOperation(operator, equation) {
    const escOperator = operator.length > 1 ? operator : `\\${operator}`;
    const pattern = presets.operations[operator].unary ?
        `${escOperator}${numberPattern}` :
        `${numberPattern}${escOperator}${numberPattern}`;
    return equation.match(pattern)[0];
}

function validateEquation(equation) {
    if (!validateOperators(equation)) {
        throw new ValidationError(errors.invalidInput);
    }
}

function validateOperators(equation) {
    if (!presets.validationRegexp.test(equation)) {
       return false;
    }
    return true;
}


