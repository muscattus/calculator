import { Operation } from "./Operation";

export class Power extends Operation{
    constructor() {
        super();
        this.calc = function(a, b) {
            return Math.pow(a, b);
        };
    }

    static symbol = '^';
    static priority = 3;
}
