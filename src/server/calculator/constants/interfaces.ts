export interface DefaultOperation {
  symbol: string,
  operator: string,
  priority: number,
  unary?: boolean,
  additional?: boolean,
  calculate(...operands: string[]): number
  // calculate(a: string, b?: string): number
}

export interface Operations {
  [key: string]: DefaultOperation
}


export interface CalculatorPresets {
  operations: Operations,
  operators: string[],
  operatorsRegexp: RegExp,
  negativeRegexp: RegExp,
  validationRegexp: RegExp
}

// module.exports = {
//   DefaultOperation,
//   Operation
// }