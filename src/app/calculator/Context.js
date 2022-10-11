import { Stack } from "./Stack";
export class Context {
    constructor() {
        this.operationsStack = new Stack();
        this.standBy;    
    }

    addNumber(number) {
        if (!this.operationsStack.getLength()) {
            this.standBy = number;
        } else {
            this.operationsStack.getLast().addInput(number);
        }
    }

    addOperation(operation) {
        let input;
        if (!operation.unary){
            if (!this.operationsStack.getLength()) {
                input = this.standBy;
                this.standBy = null;
            }else {
                const lastOperation = this.operationsStack.getLast();
                input = operation.priority > lastOperation.priority ? lastOperation.takeLastInput() : this.calculate();
            }
            operation.addInput(input);
        }
        this.operationsStack.add(operation);
    }

    calculate() {
        let result;
        while (this.operationsStack.getLength()) {
            const currentOperation = this.operationsStack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.operationsStack.getLength()) {
                this.operationsStack.getLast().addInput(result);
            }
        }
        return result;
    };
}