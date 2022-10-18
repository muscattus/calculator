import { operations} from "./operations/main";
import { allNumbersRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, negativePattern,
    minus, parentheses, errors }from "../constants/constants";

export class Calculator {
    constructor() {
        this.operations = {};
        this.operations = Calculator.getOperations(operations);
        this.operators = Object.keys(this.operations);
        this.operatorsRegexpPattern = Calculator.getOperatorsRegexpString(this.operators);
        this.operatorsRegexp = new RegExp(this.operatorsRegexpPattern, 'g');
        this.negativeRegexp = Calculator.getNegativeRegexp(this.operatorsRegexpPattern);
        this.validationRegexp = Calculator.getValidationRegexp(this.operatorsRegexpPattern);
    }

    static getOperations = function(operations) {
        const calculatorOperations = {};
        operations.forEach(operation => {
            calculatorOperations[operation.symbol] = operation;
        })
        return calculatorOperations;
    };

    static getNegativeRegexp (operatorsRegexpPattern) {
        const operatorsPattern = `(?<=${operatorsRegexpPattern})-(?=\\d+)`;
        const operatorsRegexp = new RegExp(operatorsPattern, 'g');
        return operatorsRegexp;
    }

    static getOperatorsRegexpString(operators) {
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

    static getValidationRegexp(operatorsRegexpPattern) {
        const pattern = `^(${numberPattern}|${operatorsRegexpPattern}|\\(|\\))+$`;
        const validationRegexp = new RegExp(pattern);
        return validationRegexp
    }

    evaluate(equation) {
        try {
            this.validateEquation(equation);
        }
        catch (error) {
            return error;
        }
        while (equation.match(/[()]/)) {
            equation = this.handleParentheses(equation);
        }
        return this.calculateNew(equation);
    }
    
    replaceNegative(equation) {
        let equationWithReplacedNegative =  equation.replaceAll(this.negativeRegexp, negativeString);
        equationWithReplacedNegative =  equationWithReplacedNegative.replace(/^-/, negativeString);
        return equationWithReplacedNegative;
    }

    handleParentheses(equation) {
        let newEquation = equation;
        const partOfEquation = newEquation.match(parenthesesRegexp);
        partOfEquation.forEach(part => {
            const result = this.calculateNew(part);
            newEquation = newEquation.replace(`(${part})`, result);
        })
        return newEquation;
    }
    
    calculateNew(equation) {
        equation = this.replaceNegative(equation);
        if(negNumberRegexp.test(equation)){
            return equation.replace(negativePattern, minus);
        }
        const allOperators = equation.match(this.operatorsRegexp);
        const currentOperator = this.getCurrentOperator(allOperators);
        const currentOperation = this.getCurrentOperation(currentOperator, equation);
        const result = this.calculateOperation(currentOperator, currentOperation)
        const newEquation = equation.replace(currentOperation, result);
        return this.calculateNew(newEquation);
    }
    

    getCurrentOperator(operators) {
        let currentOperator = operators[0];
        for(let i = 1; i < operators.length; i++) {
            const symbol = operators[i];
            if(this.operations[symbol].priority > this.operations[currentOperator].priority) {
                currentOperator = symbol;
            } else {
                return currentOperator;
            }

        }
        return currentOperator;
    }

    calculateOperation(operator, operationString) {
        const operands = operationString.match(allNumbersRegexp);
        const operationFunc = this.operations[operator];
        const operation = new operationFunc();
        operands.forEach(element => {
            let operand = element.replace(negativePattern, minus);
            operation.addInput(operand);
        });
        const result = operation.calc(...operation.inputs);
        return result;
    }

    getCurrentOperation(operator, equation) {
        const escOperator = operator.length > 1 ? operator : `\\${operator}`;
        const pattern = this.operations[operator].unary ?
            `${escOperator}${numberPattern}` :
            `${numberPattern}${escOperator}${numberPattern}`;
        return equation.match(pattern)[0];
    }

    validateEquation(equation) {
        if (!this.validationRegexp.test(equation) || !this.validateParentheses(equation)) {
            throw errors.invalidInput
        }
    }

    validateParentheses(equationArray) {
        let stack = [];
        for (let i = 0; i < equationArray.length; i++) {
            if (equationArray[i] === parentheses.close && stack[stack.length-1] === parentheses.open){
                stack.pop();
            } else {
                if (equationArray[i] === parentheses.open || equationArray[i] === parentheses.close) {
                    stack.push(equationArray[i]);
                }
            }
        }
        return stack.length === 0;
    };
}


