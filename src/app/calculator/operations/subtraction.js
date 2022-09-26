import { Operation } from "./Operation";

export class Subtraction extends Operation {
    constructor() {
        super();
        this.priority = 1;
        this.calc = function(a, b) {
            return +a - +b;
        };
    }
    static symbol = '-';
}
