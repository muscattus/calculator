import { operations } from "./operations/main";
import { numberRegex } from "../constants/constants";

export class Calculator {
    constructor() {
        this.operations = {};;
        operations.forEach((operation) => {
            const operator = operation.symbol;
            this.operations[operator] = operation;
        });
        this.operators = Object.keys(this.operations);
    }

    evaluate(equation) {
        const equationArray = equation.split(' ');
        let stack = new Stack();
        for (let sign of equationArray) {
            if (sign.match(numberRegex)) {
                if (!stack.stackLength()) {
                    stack.standBy = sign;
                } else {
                    stack.getLastOnStack().inputs.push(sign);
                }
            } else if (this.operators.includes(sign)) {
                if (stack.stackLength()) {
                    const lastOperation = stack.getLastOnStack();
                    if (this.operations[sign].priority > lastOperation.priority) {
                        const operation = this.operations[sign];
                        operation.inputs.push(lastOperation.inputs.pop());
                        stack.stack.push(operation);
                    } else {
                        const result = stack.calculate();
                        const operation = this.operations[sign];
                        operation.inputs.push(result);
                        stack.stack.push(operation);
                    }
                } else {
                    const operation = this.operations[sign];
                    operation.inputs.push(stack.standBy);
                    stack.standBy = null;
                    stack.stack.push(operation);
                }
            }
        }
        return stack.calculate();
    }
}

class Stack {
    constructor() {
        this.stack = [];
    }

    stackLength() {
        return this.stack.length;
    };

    getLastOnStack() {
        return this.stack[this.stackLength() - 1];
    };

    calculate() {
        let result;
        while (this.stackLength()) {
            const currentOperation = this.stack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.stackLength()) {
                this.getLastOnStack().inputs.push(result);
            }
        }
        return result;
    };
}