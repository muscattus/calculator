import { Operation } from "./Operation";

export function Power() {
    Operation.call(this);
    this.priority = 3;
    this.operands = 2;
    this.symbol = '^';
    this.inputs = [];
    this.calc = function(a, b) {
        return Math.pow(a, b);
    };
    this.addInput = function(number) {
        this.inputs.push(number);
    }
}