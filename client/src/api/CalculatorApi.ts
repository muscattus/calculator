import { historyLength } from './../mvc/constants/constants';
import { fetchData } from "./helpers/fetch-data";
import { BASE_URL } from "./constants/constants";


class Singleton {
  private static instance: Singleton;

  headers: any;

  private constructor() { 
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }

      return Singleton.instance;
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

export const CalculatorApi = Singleton.getInstance();