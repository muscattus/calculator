import { operations } from "./operations/main";

export class Calculator {
    constructor() {
        this.operations = {};
        Object.keys(operations).forEach((operation) => {
            this.operations[operations[operation].symbol] = operations[operation];
        });
    }

    evaluate(equation) {
        const operators = Object.keys(this.operations);
        const equationArray = equation.split(' ');
        let result;
        // let context;
        let context = new Context();
        const reg = /\d+(\.\d+)?$/
        // let
        for (let sign of equationArray) {
            // console.log(sign)
            if (sign.match(reg)) {
                if (!context.stackLength()) {
                    // console.log('4', sign);
                    context.standBy = sign;
                } else {
                    // console.log('5', sign);
                    context.getLastOnStack().inputs.push(sign);
                }
            } else if (operators.includes(sign)) {
                if (context.stackLength()) {
                    const lastOperation = context.getLastOnStack();
                    if (this.operations[sign].priority > lastOperation.priority) {
                        // console.log('1', sign);
                        const operation = this.operations[sign];
                        // console.log(lastOperation.inputs[lastOperation.inputs.length - 1]);
                        // console.log(operation.inputs);
                        operation.inputs.push(lastOperation.inputs.pop());
                        context.stack.push(operation);
                    } else {
                        // console.log('2', sign);
                        const result = context.close();
                        const operation = this.operations[sign];
                        operation.inputs.push(result);
                        context.stack.push(operation);
                    }
                } else {
                    // console.log('3', sign);
                    const operation = this.operations[sign];
                    operation.inputs.push(context.standBy);
                    context.standBy = null;
                    context.stack.push(operation);
                }
            }
            // console.log('stack');
            // context.stack.forEach(el => console.log(JSON.stringify(el)));
        }
        // console.log(context.stack[0].calc(...context.stack[0].inputs));
        console.log(context.close());

        // for (let op of this.stack){
        //     const result = this.operations[op.symbol].calc(...op.ops);
        //     console.log(result);
        //     console.log(this.operations['-'].calc(this.operations['+'].calc(4,6), 3));
        // }

        // console.log(equationArray);
    }
}

class Context {
    constructor() {
        this.stack = [];
    }

    stackLength() {
        return this.stack.length;
    };

    getLastOnStack() {
        return this.stack[this.stackLength() - 1];
    };

    close() {
        let result;
        while (this.stackLength()) {
            const currentOperation = this.stack.pop();
            result = currentOperation.calc(...currentOperation.inputs);
            currentOperation.inputs = [];
            if (this.stackLength()) {
                this.getLastOnStack().inputs.push(result);
            } else {
                return result;
            }
        }
        return result;
    };
}