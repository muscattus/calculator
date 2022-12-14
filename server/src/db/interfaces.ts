export interface Entry {
  equation: string,
  calculatedresult: string
}

export interface ListFilters {
  limit?: number,
  orderBy?: {
    field: string,
    direction: string,
  }
  where?: {
    [key: string]: any
  }

}