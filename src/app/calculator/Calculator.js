import { operations} from "./operations/main";
import { numberRegex, negative, CODES, numRegex, negNumberRegex, parenthesesRegex } from "../constants/constants";
import { Context } from "./Context";
import { Stack } from "./Stack";

export class Calculator {
    constructor() {
        this.operations = {};
        this.operations = Calculator.getOperations(operations);
        this.operators = Object.keys(this.operations);
        this.contextStack = new Stack();
        this.operatorsRegexp = new RegExp(this.getOperatorsRegexpString(), 'g');
    }

    static getOperations = function(operations) {
        const extracted = {};
        operations.forEach(operation => {
            extracted[operation.symbol] = operation;
        })
        return extracted;
    };


    replaceNegative(equation) {
        const operatorsRe = this.getOperatorsRegexpString();
        const combinedStr = `(?<=${operatorsRe})-(?=\\d+)`;
        const combinedRe = new RegExp(combinedStr, 'g');
        let newEquation =  equation.replaceAll(combinedRe, 'neg');
        newEquation =  newEquation.replace(/^-/, 'neg');
        return newEquation;
    }

    evaluate(equation) {
        // if (!this.validateEquation(equationArray)) {
        //     return 'INVALID INPUT';
        // }
        while (equation.match(/[()]/)) {
            equation = this.handleParentheses(equation);
        }
        // console.log(this.handleParentheses(equation));
        return this.calculateNew(equation);
    }
    
    handleParentheses(equation) {
        let newEquation = equation;
        const partOfEquation = newEquation.match(parenthesesRegex);
        console.log('equation', equation);
        console.log('part of', partOfEquation);
        partOfEquation.forEach(part => {
            const result = this.calculateNew(part);
            console.log('part', part);
            console.log('result', result);
            // const operator = part.match(this.operatorsRegexp);
            // part = part.replace(this.operatorsRegexp, `\\${operator}`);
            // const reg = new RegExp(`\\(${part}\\)`);
            newEquation = newEquation.replace(`(${part})`, result);
        })
        return newEquation;
    }
    
    calculateNew(equation) {
        equation = this.replaceNegative(equation);
        if(negNumberRegex.test(equation)){
            return equation.replace(/^neg/, '-');
        }
        const foundOperators = equation.match(this.operatorsRegexp);
        const currentOperator = this.findCurrentOperator(foundOperators);
        const operationRegex = this.getOperationRegex(currentOperator);
        const operat = equation.match(operationRegex);
        const result = this.calculateOperation(currentOperator, operat[0])
        const newEquation = equation.replace(operationRegex, result);
        return this.calculateNew(newEquation);
    }
    

    findCurrentOperator(operators) {
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

    calculateOperation(operator, str) {
        // console.log(str);
        const operands = str.match(numRegex);
        const operationFunc = this.operations[operator];
        const operation = new operationFunc();
        operands.forEach(element => {
            // console.log(element);
            // console.log(element * -1);
            let operand = /^neg/.test(element) ? element.substring(3) * -1 : element;
            operation.addInput(operand);
        });
        const result = operation.calc(...operation.inputs);
        return result;
    }

    getOperationRegex(operator) {
        // let pat = this.operations[operator].unary ? `${operator}(neg)?[0-9\.]+` : `(neg)?[0-9\.]+${operator}(neg)?[0-9\.]+`;
        // console.log(this.screenOperator(pat));
        const escOperator = operator.length > 1 ? operator : `\\${operator}`;
        const pattern = this.operations[operator].unary ? `${escOperator}(neg)?[0-9\.]+` : `(neg)?[0-9\.]+${escOperator}(neg)?[0-9\.]+`;
        console.log(pattern);
        return new RegExp(pattern)
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

    // screenOperator(regexString) {
    //     const operator = regexString.match(this.operatorsRegexp);
    //     console.log(regexString);
    //     console.log(operator);
    //     if(operator.length === 1) {
    //         // const operatorRegexp = new RegExp(`\\${operator}`);
    //         return regexString.replace(operator, `\\${operator}`);
    //     }
    //     return regexString;
    // }

    // getOperatorsRe() {
    //     const escapedOperators = this.operators.map(operator => {
    //         if (operator.length === 1) {
    //             return`\\${operator}`;
    //         } else {
    //             return operator
    //         }
    //     })
    //     const operatorsStr = escapedOperators.join('|');
    //     const operatorsRe = new RegExp(`(${operatorsStr}|\\(|\\))`, 'g');
    //     return operatorsRe;
    // }

    validateEquation(equationArray) {
        return this.validateParentheses(equationArray) && equationArray.every(element => {
            return this.operators.includes(element) ||
            numberRegex.test(element) ||
                element === '(' ||
                element === ')';
        })
    }

    validateParentheses(equationArray) {
        let stack = [];
        for (let i = 0; i < equationArray.length; i++) {
            if (equationArray[i] === ')' && stack[stack.length-1] === '('){
                stack.pop();
            } else {
                if (equationArray[i] === '(' || equationArray[i] ===')') {
                    stack.push(equationArray[i]);
                }
            }
        }
        return stack.length === 0;
    };
}


