export class Model {

  observers: any[] = [];

  subscribe(eventType: string, listener: any): void {
    this.observers.push({[eventType]: listener});
  }

  unsubscribe(eventType: string) {
    this.observers = this.observers.filter(observer => !Object.keys(observer).includes(eventType));
  }

  notifyListeners(eventType: string, payload: any) {
    this.observers.forEach( observer => {
      if(Object.keys(observer).includes(eventType)){
          observer[eventType].update(payload);
      }
    });
  }

  setState(eventType: string, payload: any) {
    this.notifyListeners(eventType, payload);
  }
}