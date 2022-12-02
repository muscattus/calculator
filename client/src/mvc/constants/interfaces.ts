export interface DefaultOperation {
  symbol: string,
  operator: string,
  priority: number,
  unary?: boolean,
  additional?: boolean,
  calculate(...operands: string[]): number
}

export interface Operations {
  [key: string]: DefaultOperation
}

export interface historyEntry {
  equation: string,
  calculatedresult?: string
}

// export interface evaluatedResponse {
//   result: string,
//   isLogged: boolean
// }

export interface Observer {
  update(data: string) : void | Promise<void>
}
export interface Listener {
  [key: string]: Observer
}