import { fetchData } from "../helpers/fetch-data";
import { BASE_URL } from "./constants";

export class CalculatorApi {
  headers;

  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  async evaluateEquation (equation: string) {
    const response = await fetchData(
      `${BASE_URL}evaluate`,
      'POST',
      this.headers,
      JSON.stringify({eq:equation})
    );
    return response.result;
  }

  async getOperations () {
    const response = await fetchData(
      `${BASE_URL}operations`,
      'GET',
      this.headers
    );
    return JSON.parse(response); 
  }
}
