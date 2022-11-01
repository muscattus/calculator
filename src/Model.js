export class Model { //Model
  constructor() {
    this.equation;
    this.result;
    this.observers = [];
  }

  subscribe(eventType, listener) {
    this.observers.push({[eventType]: listener});
  }

  unsubscribe(eventType) {
    this.observers = this.observers.filter(observer => !Object.keys(observer).includes(eventType));
  }

  notifyListeners(eventType, payload) {
    this.observers.forEach( observer => {
      if(Object.keys(observer).includes(eventType)){
          observer[eventType].update(payload);
      }
    });
  }

  setState(eventType, payload) {
    this.notifyListeners(eventType, payload);
  }
}