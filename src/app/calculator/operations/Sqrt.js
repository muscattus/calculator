import { Operation } from "./Operation";

export class SquareRoot extends Operation {
    constructor(){
        super();
        this.priority = 3;
        this.unary = true;
        this.calc = function(a) {
            return Math.sqrt(+a);
        };
    }

    static symbol = 'sqrt';
}