import { allNumbersRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, negativePattern, parenthesesPattern,
    minus, errors }from "../constants/constants";
import { config } from "./calculatorConfig";


export function evaluate(equation) {    
    try {
        validateEquation(equation);
    }
    catch (error) {
        return error;
    }
    const result = handleParentheses(equation);
    return result
}
    
function replaceNegative(equation) {
    const equationWithReplacedNegative =  equation.replaceAll(config.negativeRegexp, negativeString);
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
    } catch (e) {
        return 'invalid parentheses'
    }
}
    
function calculate(equation) {
    const equationWithReplacedNegative = replaceNegative(equation);
    if(negNumberRegexp.test(equationWithReplacedNegative)){
        return equationWithReplacedNegative.replace(negativePattern, minus);
    }
    const allOperators = equationWithReplacedNegative.match(config.operatorsRegexp);
    const currentOperator = getCurrentOperator(allOperators);
    const currentOperation = getCurrentOperation(currentOperator, equationWithReplacedNegative);
    const result = calculateOperation(currentOperator, currentOperation);
    const newEquation = equationWithReplacedNegative.replace(currentOperation, result);
    return calculate(newEquation);
}
    

function getCurrentOperator(operators) {
    let currentOperator = operators[0];
    for(let i = 1; i < operators.length; i++) {
        const symbol = operators[i];
        if(config.operations[symbol].priority > config.operations[currentOperator].priority) {
            currentOperator = symbol;
        } else {
            return currentOperator;
        }

    }
    return currentOperator;
}

function calculateOperation(operator, operationString) {
    let operands = operationString.match(allNumbersRegexp);
    const operation = config.operations[operator];
    operands = operands.map(operand => {
        return operand.replace(negativePattern, minus);
    });
    const result = operation.calc(...operands);
    return result;
}

function getCurrentOperation(operator, equation) {
    const escOperator = operator.length > 1 ? operator : `\\${operator}`;
    const pattern = config.operations[operator].unary ?
        `${escOperator}${numberPattern}` :
        `${numberPattern}${escOperator}${numberPattern}`;
    return equation.match(pattern)[0];
}

function validateEquation(equation) {
    if (!validateOperators(equation)) {
        throw errors.invalidInput
    }
}

// function validateParentheses(equationArray) {
//     let stack = [];
//     for (let i = 0; i < equationArray.length; i++) {
//         if (equationArray[i] === parentheses.close && stack[stack.length-1] === parentheses.open){
//             stack.pop();
//         } else {
//             if (equationArray[i] === parentheses.open || equationArray[i] === parentheses.close) {
//                 stack.push(equationArray[i]);
//             }
//         }
//     }
//     return stack.length === 0;
// };

function validateOperators(equation) {
    if (!config.validationRegexp.test(equation)) {
       return false;
    }
    return true;
}


