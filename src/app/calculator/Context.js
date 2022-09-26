import { Stack } from "./Stack";

export class Context {
    constructor() {
        this.operationsStack = new Stack;
        this.standBy;    
    }

    addNumber(number) {
        if (!this.operationsStack.length()) {
            this.standBy = number;
        } else {
            this.operationsStack.getLast().addInput(number);
        }
    }

    addOperation(operation) {
        if (this.operationsStack.length()) {
            const lastOperation = this.operationsStack.getLast();
            if (operation.priority > lastOperation.priority) {
                operation.addInput(lastOperation.takeLastInput());
                this.operationsStack.add(operation);
            } else {
                const result = this.calculate();
                operation.addInput(result);
                this.operationsStack.add(operation);
            }
        } else {
            operation.addInput(this.standBy);
            this.standBy = null;
            this.operationsStack.add(operation);
        }
    }

    calculate() {
        let result;
        while (this.operationsStack.length()) {
            const currentOperation = this.operationsStack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.operationsStack.length()) {
                this.operationsStack.getLast().addInput(result);
            }
            // console.log(result);
        }
        return result;
    };
}