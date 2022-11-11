// import { errorMessages } from './../server/calculator/errors/errorMessages';
import { EVENT_TYPES, ERROR_MESSAGES } from "./constants/constants";
import { Model } from "./Model";
import { CalculatorApi } from "../api/CalculatorApi";

export class Controller {
  model: any;
  api: any;

  constructor(model: Model) {
    this.model = model;
  }

  async update(data: string): Promise<void> {
    try {
      const result = await this.evaluate(data);
      this.model.setState(EVENT_TYPES.display, result);
    } catch (error) {
      // if (error instanceof ValidationError) {
      //   if (error.errorMessages === 'Validation')
      //   this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.validationError);
      // }
      // else {
        this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.generalError);
      // }
    }
  }

  async evaluate(equation: string) {
    const result = await CalculatorApi.evaluateEquation(equation); 
    return result;
  }

}