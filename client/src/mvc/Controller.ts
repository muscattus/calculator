import { apiError } from "../api/constants/interfaces";
import { handleError } from "../api/helpers/handle-error";
import { EVENT_TYPES } from "./constants/constants";
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
      const errorMessage = handleError(error);
      this.model.setState(EVENT_TYPES.display, errorMessage);
    }
  }

  async evaluate(equation: string) {
      const result = await CalculatorApi.evaluateEquation(equation); 
      return result;
  }

}