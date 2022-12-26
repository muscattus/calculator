
import { DBError } from "../../calculator/errors/DBError";
import { initializeMongo } from "../../../mongo.config";
// const mongoose = require('mongoose');

const History = require('./models/History');

// function initializeMongo() {
//   mongoose.connect('mongodb://localhost:27062/mongo')
//   .then(() => console.log('connected to mongo'))
//   .catch((e: any) => { console.log('not connected'); console.log(e)});
// }

// export default History.mongoose.connect("mongodb://mongo:2717/mongo").then(() => console.log('connected to mongo')).catch(() => console.log('not connected'));
//  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

export default class MongoOperations<Record> {
  tableName: string;
  record: Record;
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
     } catch (e) {
      console.log(e);
      // return DBError.insertError()
     }
  }

  async list(filters: any): Promise<Record[]> {
    const direction = filters.orderBy?.direction === 'asc' ? 1 : -1;
    const foundHistory = await History.find(filters.where || {})
      .sort({[filters.orderBy?.field]: direction} || 1)
      .limit(filters.limit || 1);
    return foundHistory;
  }


  async beforeInsert() {}
//   afterInsert() {}
//   beforeList() {}
//   afterList() {}
}