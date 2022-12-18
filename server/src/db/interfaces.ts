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