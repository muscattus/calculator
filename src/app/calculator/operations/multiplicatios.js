import { Operation } from "./Operation";

export class Multiplication extends Operation {
    constructor() {
        super();
        this.priority = 2;
        this.calc = function(a, b) {
            return +a * +b;
        };
    }
    static symbol = '*';
    static priority = 2;
}