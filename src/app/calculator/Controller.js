import { Calculator } from "./Calculator";

export class Controller {
    constructor() {
    //     if (!Controller._instance) {
    //         Controller._instance = this;
    //     }
    //     this.observers = [];
        this.calculator = new Calculator();
    //     return Controller._instance;
    }

    // static getInstance() {
    //     return this._instance;
    //   }

    // subscribe(listener, notify) {
    //     this.observers.push({listener, notify});
    // }

    // unsubscribe(listener) {
    //     this.observers = this.observers.filter(observer => observer !== listener);
    // }

    // notify(listener, payload) {
    //     const observer = this.observers.find(observer => observer.listener === listener);
    //     console.log
    //     observer.notify.call(observer.listener, payload);
    // }

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