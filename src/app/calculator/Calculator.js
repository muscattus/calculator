import { operations} from "./operations/main";
import { numberRegex, negative } from "../constants/constants";
import { Context } from "./Context";
import { Stack } from "./Stack";

export class Calculator {
    constructor() {
        this.operations = {};
        this.operations = Calculator.getOperations(operations);
        this.operators = Object.keys(this.operations);
        this.contextStack = new Stack();
    }

    static getOperations = function(operations) {
        const extracted = {};
        operations.forEach(operation => {
            extracted[operation.symbol] = operation;
        })
        return extracted;
    };

    parse (equation) {
        const operatorsRe = this.getOperatorsRe();
        const equationArray = equation.split(operatorsRe).filter(el => el != '' && el != undefined);
        return equationArray;
    }
    
    getOperatorsRe() {
        const escapedOperators = this.operators.map(operator => {
            if (operator.length === 1) {
                return`\\${operator}`;
            } else {
                return operator
            }
        })
        const operatorsStr = escapedOperators.join('|');
        const operatorsRe = new RegExp(`(${operatorsStr}|\\(|\\))`, 'g');
        return operatorsRe;
    }

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

    openParentheses() {
        const previousContext = this.contextStack.getLast();
        if (previousContext.operationsStack.length()) {
            const parentheses = new Context();
            this.contextStack.add(parentheses);
        }
    }

    closeParentheses() {
            const contextToClose = this.contextStack.pop();
            const result = contextToClose.calculate();
            return result; 
    }
    evaluate(equation) {
        const equationArray = this.parse(equation);
        if (!this.validateEquation(equationArray)) {
            return 'INVALID INPUT';
        }
        while (equationArray.length) {
            if (!this.contextStack.length()){
                let context = new Context();
                this.contextStack.add(context);
            }
            const element = equationArray.shift(); 
            if (numberRegex.test(element)) {
                this.contextStack.getLast().addNumber(element);
            } else if (this.operators.includes(element)) {
                const operation = this.operations[element];
                this.contextStack.getLast().addOperation(new operation());
            }
             else if (element === '('){
                this.openParentheses();
            } else if (element === ')') {
                const interimResult = this.closeParentheses();
                if (equationArray.length || this.contextStack.length()){
                    equationArray.unshift(interimResult.toString());
                } else {
                    return interimResult;
                }
            }
        }
        const lastContext = this.contextStack.pop();
        return lastContext.calculate();
    }
}


