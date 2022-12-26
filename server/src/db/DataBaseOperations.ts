import { db } from "../../knex.config";
import { DBError } from "../calculator/errors/DBError";
import { ListFilters } from "./interfaces";

export default class DataBaseOperations<Record> {
  tableName: string;
  record: Record;
  constructor (tableName: string) {
    this.tableName = tableName;
  }

  async insert() {}
  async list() {}
  // async insert (record: Record, returnField: string): Promise<Record[]> {
  //   this.record = record;
  //   await this.beforeInsert();
  //   return db(this.tableName)
  //   .insert(
  //     [
  //       record, 
  //     ], 
  //     [returnField]
  //     )
  //     .then((result: Record[]) => {
  //       return result;
  //     })
  //     .catch(() => {
  //       return DBError.insertError();
  //     })
  // }

  // async list( filters: ListFilters): Promise<Record[]> {
  //   return db
  //   .select('*')
  //   .from (this.tableName)
  //   .limit(filters.limit || 1)
  //   .modify((queryBuilder: any) => {
  //     if (filters.where){
  //       queryBuilder.where(filters.where)
  //     }
  //     if (filters.orderBy){
  //       queryBuilder.orderBy(filters.orderBy.field, filters.orderBy.direction)
  //     }
  //   })
  //   .then((match: Record) => {
  //     return match;
  //   })
  //   .catch(()=> {
  //     return DBError.matchError()
  //   })
  // }

  async beforeInsert() {}
  afterInsert() {}
  beforeList() {}
  afterList() {}
}