import { Operation } from "./Operation";

export class Power extends Operation{
    constructor() {
        super();
        this.priority = 3;
        this.calc = function(a, b) {
            return Math.pow(a, b);
        };
    }

    static symbol = '^';
}
