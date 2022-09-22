import { operations, operators } from "./operations/main";
import { numberRegex } from "../constants/constants";

export function Calculator () {
    this.operations = {};
    // operations.forEach((operation) => {
    //     const operator = operation.symbol;
    //     this.operations[operator] = operation;
    // });
    this.operations = operations;
    // this.operators = Object.keys(this.operations);
    this.operators = operators;

    // this.stack = [];

    this.parse = function(equation) {
        const operatorsRe = this.getOperatorsRe();
        const equationArray = equation.split(operatorsRe);
        return equationArray;
    }
    
    this.getOperatorsRe = function() {
        const operatorsStr = this.operators.join('\\');
        const operatorsRe = new RegExp(`([\\'${operatorsStr}])`, 'g');
        return operatorsRe;
    }
    this.evaluate = function (equation) {
        this.parse(equation);
        const equationArray = this.parse(equation);
        let stack = new Context();
        for (let element of equationArray) {
            if (element.match(numberRegex)) {
                stack.addNumber(element);
            } else {
                stack.addOperation(new this.operations[element]());
            }
        }
        return stack.calculate();
    }
}

function Context() {
    this.stack = [];
    this.standBy;

    this.stackLength = function() {
        return this.stack.length;
    };

    this.getLastOnStack = function() {
        return this.stack[this.stackLength() - 1];
    };

    this.addNumber = function(number) {
        if (!this.stackLength()) {
            this.standBy = number;
        } else {
            this.getLastOnStack().inputs.push(number);
        }
    }

    this.addOperation = function(operation) {
        if (this.stackLength()) {
            const lastOperation = this.getLastOnStack();
            if (operation.priority > lastOperation.priority) {
                operation.addInput(lastOperation.inputs.pop());
                // operation.inputs.push(lastOperation.inputs.pop());
                this.stack.push(operation);
            } else {
                const result = this.calculate();
                operation.addInput(result);
                // operation.inputs.push(result);
                this.stack.push(operation);
            }
        } else {
            operation.addInput(this.standBy);
            // operation.inputs.push(this.standBy);
            this.standBy = null;
            this.stack.push(operation);
        }
    }

    this.calculate = function() {
        let result;
        while (this.stackLength()) {
            const currentOperation = this.stack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.stackLength()) {
                this.getLastOnStack().addInput(result);
                // this.getLastOnStack().inputs.push(result);
            }
        }
        return result;
    };
}