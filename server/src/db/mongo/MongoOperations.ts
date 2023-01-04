
import { DBError } from "../../calculator/errors/DBError";
import { initializeMongo } from "../../../mongo.config";

const History = require('./models/History');

export default class MongoOperations<Record> {
  tableName: string;
  record: Record;


  // public static getInstance<Service>(tableName: string, service: any){
  //   if (!service.instance) {
  //     service.instance = new service(tableName);
  //   }

  //   return service.instance;
  // }

  constructor (tableName: string) {
    this.tableName = tableName;
    initializeMongo();
  }

  async insert (record: Record, returnField: string): Promise<Record[] | void> {
    this.record = record;
    await this.beforeInsert();
    try {
      const history = new History(record);
      const inserts = await history.save();
      return inserts;
     } catch {
      throw DBError.insertError()
     }
  }

  async list(filters: any): Promise<Record[]> {
    const direction = filters.orderBy?.direction === 'asc' ? 1 : -1;
    try {
      const foundHistory = await History.find(filters.where || {})
      // .sort({[filters.orderBy?.field]: -1})
      .sort({'date': direction})          //needs to be corrected to the dynamic date field
      .limit(filters.limit || 1)
      return foundHistory;
    } catch{
        throw DBError.matchError()
    };
  }


  async beforeInsert() {}
//   afterInsert() {}
//   beforeList() {}
//   afterList() {}
}