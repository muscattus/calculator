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
        let input;
        if (!operation.unary){
            if (!this.operationsStack.length()) {
                input = this.standBy;
                this.standBy = null;
            }else {
                const lastOperation = this.operationsStack.getLast();
                input = operation.priority > lastOperation.priority ? lastOperation.takeLastInput() : this.calculate();
            }
            operation.addInput(input);
        }
        this.operationsStack.add(operation);
        // if (operation.priority > lastOperation.priority) {
            //     operation.addInput(lastOperation.takeLastInput());
            // } else {
                //     const result = this.calculate();
                //     operation.addInput(result);
                // }
                // } else if (!this.operationsStack.length() && !operation.unary) {
                    //     operation.addInput(this.standBy);
                    //     this.standBy = null;
                    // }
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
        }
        return result;
    };
}