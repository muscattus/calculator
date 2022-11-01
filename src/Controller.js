import { evaluate } from "./calculator/Calculator";
import { ValidationError } from "./calculator/errors/errors";
import { EVENT_TYPES } from "./constants/constants";

export class Controller {
    constructor(model) {
        this.model = model;
    }

    update(equation) {
        try {
            const result = this.evaluate(equation);
            this.model.setState(EVENT_TYPES.display, result);
        } catch (error) {
            if (error instanceof ValidationError) {
                this.model.setState(EVENT_TYPES.showError, error.message);
            }
            else {
                this.model.setState(EVENT_TYPES.showError, 'try again');
            }
        }
    }

    evaluate(equation) {
        return evaluate(equation);
    }

}


// console.log('22*3=', calculator.evaluate('22*3'));
    // console.log('22/3=', calculator.evaluate('22/3'));
    // console.log('2*3+6=', calculator.evaluate('2*3+6')); 12
    // console.log('2*(3+6)=', calculator.evaluate('2*(3+6)')); 18
    // console.log('(3+6)=', calculator.evaluate('(3+6)')); 9
    // console.log('(13+sqrt16=', calculator.evaluate('13+sqrt16)')); 17
    // console.log('(13+8)*sqrt16=', calculator.evaluate('(13+8)*sqrt16'));  84
    // console.log('(3+6)+1=', calculator.evaluate('(3+6)+1')); 10
    // console.log('(30-22)*2=', calculator.evaluate('(30-22)*2')); 16  
    // console.log('3+4*(2+6)=', calculator.evaluate('3+4*(2+6)')); 35
    // console.log('(3+4)*(2+6)=', calculator.evaluate('(3+4)*(2+6)')); 56
    // console.log('(3+4)*(2+6)*(5+5)=', calculator.evaluate('(3+4)*(2+6)*(5+5)')); 560
    // console.log('11*5-3^2=', calculator.evaluate('11*5-3^2')); 46
    // console.log('11*(5-3)^2=', calculator.evaluate('11*(5-3)^2')); 44
    // console.log('1*3+6+3-4^2=', calculator.evaluate('1*3+6+3-4^2')); -4
    //2+4*2^3 34
    //4*(3+2*(7-5)) 28
    //-2+17 15
    //17+-2 15
    //17--5 22
    //3*(-4) -12
    //-5*-2 10
    //5*(-3+7) 20