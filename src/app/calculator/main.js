import { Controller } from './Controller';

export class Model { //Model

    constructor() {
        this.controller = new Controller();
        this.equation;
        this.result;
        this.observers = [];
    }

    subscribe(listener) {
        this.observers.push(listener);
    }

    unsubscribe(listener) {
        this.observers = this.observers.filter(observer => observer !== listener);
    }

    notify(payload) {
        this.observers.forEach( observer => observer.update(payload));
    }
    
    setEquation(equationString) {
        this.equation = equationString;
        const result = this.controller.evaluate(equationString);
        this.updateResult(result);
    }

    updateResult(result) {
        this.result = result;
        this.notify(result);
    }
}