import { Calculator } from './Calculator';
import { Controller } from './Controller';

export class Model { //Model

    constructor() {
        this.controller = new Controller();
        // this.controller.subscribe(this.view, viewNotify);
        this.equation;
        this.result;
        this.observers = [];
    }



    // subscribe(listenerName, listener) {
    //     this.observers.push({[listenerName]: listener});
    // }

    subscribe(listener) {
        this.observers.push(listener);
    }

    unsubscribe(listener) {
        this.observers = this.observers.filter(observer => observer !== listener);
    }

    notify(payload) {
        this.observers.forEach( observer => observer.update(payload));
    }
    // notify(listener, payload) {
    //     const observer = this.observers.find(observer => observer.listener === listener);
    //     observer.update(payload);
    //     // observer.notify.call(observer.listener, payload);
    // }

    setEquation(equationString) {
        this.equation = equationString;
        const result = this.controller.evaluate(equationString);
        this.updateResult(result);
    }

    updateResult(result) {
        this.result = result;
        this.notify(result);
    }

    // evaluate(equation) {
    //     const result = this.calculator.evaluate(equation);
    //     this.controller.notify(this.view, result);
    // }
}