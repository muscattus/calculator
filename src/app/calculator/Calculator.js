import { operations} from "./operations/main";
import { numberRegexp, negativeString, negNumberRegexp, numberPattern, parenthesesRegexp, minus, parentheses, negativePattern } from "../constants/constants";

export class Calculator {
    constructor() {
        this.operations = {};
        this.operations = Calculator.getOperations(operations);
        this.operators = Object.keys(this.operations);
        this.operatorsRegexpPattern = this.getOperatorsRegexpString();
        this.operatorsRegexp = new RegExp(this.operatorsRegexpPattern, 'g');
        this.negativeRegexp = this.getNegativeRegexp();
        this.validationRegexp = this.getValidationRegexp();
    }

    static getOperations = function(operations) {
        const calculatorOperations = {};
        operations.forEach(operation => {
            calculatorOperations[operation.symbol] = operation;
        })
        return calculatorOperations;
    };

    getNegativeRegexp () {
        const operatorsPattern = `(?<=${this.operatorsRegexpPattern})-(?=\\d+)`;
        const operatorsRegexp = new RegExp(operatorsPattern, 'g');
        return operatorsRegexp;
    }

    replaceNegative(equation) {
        let equationWithReplacedNegative =  equation.replaceAll(this.negativeRegexp, negativeString);
        equationWithReplacedNegative =  equationWithReplacedNegative.replace(/^-/, negativeString);
        return equationWithReplacedNegative;
    }

    evaluate(equation) {
        if (!this.validateEquation(equation)) {
            return 'INVALID INPUT';
        }
        this.validateEquation(equation);
        while (equation.match(/[()]/)) {
            equation = this.handleParentheses(equation);
        }
        return this.calculateNew(equation);
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
        const operands = operationString.match(numberRegexp);
        const operationFunc = this.operations[operator];
        const operation = new operationFunc();
        operands.forEach(element => {
            let operand = negativePattern.test(element) ? element.substring(3) * -1 : element;
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

    getOperatorsRegexpString() {
        const escapedOperators = this.operators.map(operator => {
            if (operator.length === 1) {
                return`\\${operator}`;
            } else {
                return operator
            }
        })
        const operatorsString = `(${escapedOperators.join('|')})`;
        return operatorsString;
    }

    getValidationRegexp() {
        const pattern = `^(${numberPattern}|${this.operatorsRegexpPattern}|\\(|\\))+$`;
        const validationRegexp = new RegExp(pattern);
        return validationRegexp
    }
    validateEquation(equation) {
        return this.validationRegexp.test(equation) && this.validateParentheses(equation);
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


