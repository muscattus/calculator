import { historyLength } from './../mvc/constants/constants';
import { fetchData } from "./helpers/fetch-data";
import { BASE_URL } from "./constants/constants";


class CalculatorApi {
  private static instance: CalculatorApi;

  headers: any;

  private constructor() { 
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  public static getInstance(): CalculatorApi {
      if (!CalculatorApi.instance) {
        CalculatorApi.instance = new CalculatorApi();
      }

      return CalculatorApi.instance;
  }

  public evaluateEquation = async function  (equation: string) {
    const calculationResult = await fetchData(
      `${BASE_URL}calculator/evaluate`,
      'POST',
      this.headers,
      JSON.stringify({equation})
      );
    return calculationResult;
  }

  public getOperations = async function () {
  const response = await fetchData(
    `${BASE_URL}operations`,
    'GET',
    this.headers
    );
    return JSON.parse(response); 
  }

  public getHistory = async function () {
    const history = await fetchData(
      `${BASE_URL}history`,
      'GET',
      this.headers
    );
    return history.history;
  }
}

export default CalculatorApi.getInstance();