import { fetchData } from "../helpers/fetch-data";
import { BASE_URL } from "./constants";

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
    const response = await fetchData(
      `${BASE_URL}calculator/evaluate`,
      'POST',
      this.headers,
      JSON.stringify({equation})
      );
    return response.result;
  }

  public getOperations = async function () {
  const response = await fetchData(
    `${BASE_URL}operations`,
    'GET',
    this.headers
    );
    return JSON.parse(response); 
  }
}

export const CalculatorApi = Singleton.getInstance();