import { operations} from "./operations/main";
import { numberRegex } from "../constants/constants";
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
        const equationArray = equation.split(operatorsRe).filter(el => el != '');
        return equationArray;
    }
    
    getOperatorsRe() {
        const operatorsStr = this.operators.join('\\');
        const operatorsRe = new RegExp(`([\\${operatorsStr}\(\)])`, 'g');
        return operatorsRe;
    }

    

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
        this.parse(equation);
        const equationArray = this.parse(equation);
        while (equationArray.length) {
            if (!this.contextStack.length()){
                let context = new Context();
                this.contextStack.add(context);
            }
            const element = equationArray.shift(); 
            if (element.match(numberRegex)) {
                this.contextStack.getLast().addNumber(element);
            } else if (this.operators.includes(element)) {
                const operation = this.operations[element]
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
    // this.evaluate = function (equation) {
    //     this.parse(equation);
    //     const equationArray = this.parse(equation);
    //     let context = new Context();
    //     this.contextStack.add(context);
    //     for (let element of equationArray) {
    //         if (element.match(numberRegex)) {
    //             this.contextStack.getLast().addNumber(element);
    //         } else if (this.operators.includes(element)) {
    //             const operation = this.operations[element]
    //             this.contextStack.getLast().addOperation(new operation());
    //         }
    //          else if (element === '('){
    //             this.openParentheses();
    //         } else if (element === ')') {
    //             this.closeParentheses();
    //         }
    //     }
    //     const lastContext = this.contextStack.pop();
    //     return lastContext.calculate();
    // }


