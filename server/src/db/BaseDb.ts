import { db } from "../../knex.config";
import { DBError } from "../calculator/errors/DBError";
import { Entry, ListFilters } from "./interfaces";

export default class BaseDb {
  tableName: string;
  constructor (tableName: string) {
    this.tableName = tableName;
  }

  async insert (entry: Entry, returnField: string): Promise<any> {
    return db(this.tableName)
      .insert(
        [
          entry, 
        ], 
        [returnField]
      )
      .then((result: any) => {
        return result;
     })
     .catch(() => {
      return DBError.insertError();
     })
  }

  async list ( filters: ListFilters) {
    return db
    .select('*')
    .from (this.tableName)
    .limit(filters.limit || 1)
    .modify((queryBuilder: any) => {
      if (filters.where){
        queryBuilder.where(filters.where)
      }
      if (filters.orderBy){
        queryBuilder.orderBy(filters.orderBy.field, filters.orderBy.direction)
      }
    })
    .then((match: any) => {
      return match;
    })
    .catch(()=> {
      return DBError.matchError()
    })
  }
}