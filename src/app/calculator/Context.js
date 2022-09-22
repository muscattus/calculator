import { Stack } from "./Stack";

export function Context() {
    this.operationsStack = new Stack;
    this.standBy;

    

    this.addNumber = function(number) {
        if (!this.operationsStack.length()) {
            this.standBy = number;
        } else {
            this.operationsStack.getLast().addInput(number);
        }
    }

    this.addOperation = function(operation) {
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

    this.calculate = function() {
        let result;
        while (this.operationsStack.length()) {
            const currentOperation = this.operationsStack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.operationsStack.length()) {
                this.operationsStack.getLast().addInput(result);
            }
        }
        return result;
    };
}