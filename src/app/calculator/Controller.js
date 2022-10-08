import { Calculator } from "./Calculator";

export class Controller {
    constructor() {
        this.calculator = new Calculator();
    }

    evaluate(equation) {
        return this.calculator.evaluate(equation);
    }

}

    // console.log('22*3=', calculator.evaluate('22*3'));
    // console.log('22/3=', calculator.evaluate('22/3'));
    // console.log('2*3+6=', calculator.evaluate('2*3+6'));
    // console.log('2*(3+6)=', calculator.evaluate('2*(3+6)'));
    // console.log('(3+6)=', calculator.evaluate('(3+6)'));
    // console.log('(13+sqrt16=', calculator.evaluate('13+sqrt16)'));
    // console.log('(13+8)*sqrt16=', calculator.evaluate('(13+8)*%16'));
    // console.log('(3+6)+1=', calculator.evaluate('(3+6)+1'));
    // console.log('(30-22)*2=', calculator.evaluate('(30-22)*2'));
    // console.log('3+4*(2+6)=', calculator.evaluate('3+4*(2+6)'));
    // console.log('(3+4)*(2+6)=', calculator.evaluate('(3+4)*(2+6)'));
    // console.log('(3+4)*(2+6)*(5+5)=', calculator.evaluate('(3+4)*(2+6)*(5+5)'));
    // console.log('11*5-3^2=', calculator.evaluate('11*5-3^2'));
    // console.log('11*(5-3)^2=', calculator.evaluate('11*(5-3)^2'));
    // console.log('1*3+6+3-4^2=', calculator.evaluate('1*3+6+3-4^2'));