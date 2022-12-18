import { db } from "../../knex.config";
import { DBError } from "../calculator/errors/DBError";
import { ListFilters } from "./interfaces";

export default class BaseDb<Record> {
  tableName: string;
  constructor (tableName: string) {
    this.tableName = tableName;
  }

  async insert (entry: Record, returnField: string): Promise<Record[]> {
    return db(this.tableName)
      .insert(
        [
          entry, 
        ], 
        [returnField]
      )
      .then((result: Record[]) => {
        return result;
     })
     .catch(() => {
      return DBError.insertError();
     })
  }

  async list( filters: ListFilters): Promise<Record[]> {
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
    .then((match: Record) => {
      return match;
    })
    .catch(()=> {
      return DBError.matchError()
    })
  }
}