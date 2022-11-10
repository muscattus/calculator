import { EVENT_TYPES, ERROR_MESSAGES } from "./constants/constants.js";

export class Controller {
  constructor(model, api) {
    this.model = model;
    this.api = api;
  }

  async update(equation) {
    try {
      const result = await this.evaluate(equation);
      this.model.setState(EVENT_TYPES.display, result);
    } catch (error) {
      if (error instanceof ValidationError) {
        this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.validationError);
      }
      else {
        this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.generalError);
      }
    }
  }

  async evaluate(equation) {
    const result = await this.api.evaluateEquation(equation); 
    return result;
  }

}