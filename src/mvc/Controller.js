// import { evaluate } from "../calculator";
// import { ValidationError } from "../calculator/errors/ValidationError";
import { EVENT_TYPES, ERROR_MESSAGES } from "./constants/constants.js";
import { fetchData } from "../helpers/fetch-data.js";

export class Controller {
  constructor(model) {
    this.model = model;
  }

  async update(equation) {
    try {
      const result = await this.evaluate(equation);
      this.model.setState(EVENT_TYPES.display, result);
    } catch (error) {
      // if (error instanceof ValidationError) {
      //   this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.validationError);
      // }
      // else {
        this.model.setState(EVENT_TYPES.showError, ERROR_MESSAGES.generalError);
      // }
    }
  }

  async evaluate(equation) {
    // const resp = await fetchData('http://localhost:3500/calculator/evaluate', {
    const resp = await fetchData( 
    'POST',
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    JSON.stringify({eq:equation}));
    console.log(resp);
    // return resp.result;
    // const data = await resp.json();
    return resp.result;
  }

}