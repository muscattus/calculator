import { Operation } from "./Operation";

export function Addition() {
    Operation.call(this);
    this.priority = 1;
    this.operands = 2;
    this.symbol = '+';
    this.calc = function(a, b) {
        return +a + +b;
    };
}