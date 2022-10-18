import { Operation } from "./Operation";

export class Subtraction extends Operation {
    constructor() {
        super();
        this.calc = function(a, b) {
            return +a - +b;
        };
    }
    static symbol = '-';
    static priority = 1;
}
