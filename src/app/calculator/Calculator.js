import { operations, operators } from "./operations/main";
import { numberRegex } from "../constants/constants";
import { Context } from "./Context";
import { Stack } from "./Stack";

export function Calculator () {
    this.operations = {};
    this.operations = operations;
    this.operators = operators;
    this.contextStack = new Stack();

    this.parse = function(equation) {
        const operatorsRe = this.getOperatorsRe();
        const equationArray = equation.split(operatorsRe).filter(el => el != '');
        return equationArray;
    }
    
    this.getOperatorsRe = function() {
        const operatorsStr = this.operators.join('\\');
        const operatorsRe = new RegExp(`([\\${operatorsStr}\(\)])`, 'g');
        return operatorsRe;
    }

    this.openParentheses = function() {
        const previousContext = this.contextStack.getLast();
        if (previousContext.operationsStack.length()) {
            const parentheses = new Context();
            this.contextStack.add(parentheses);
        }
    }

    this.closeParentheses = function() {
        if(this.contextStack.length() > 1) {
            const contextToClose = this.contextStack.pop();
            const result = contextToClose.calculate();
            this.contextStack.getLast().addNumber(result); 
        }
    }
    this.evaluate = function (equation) {
        this.parse(equation);
        const equationArray = this.parse(equation);
        let context = new Context();
        this.contextStack.add(context);
        for (let element of equationArray) {
            if (element.match(numberRegex)) {
                this.contextStack.getLast().addNumber(element);
            } else if (this.operators.includes(element)) {
                const operation = this.operations[element]
                this.contextStack.getLast().addOperation(new operation());
            }
             else if (element === '('){
                this.openParentheses();
            } else if (element === ')') {
                this.closeParentheses();
            }
        }
        const lastContext = this.contextStack.pop();
        return lastContext.calculate();
    }
}

