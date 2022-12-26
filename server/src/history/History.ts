import  { Response } from 'express';
// import PostgresOperations from '../db/postgres/PostgresOperations';
import { History} from './constants/interfaces'
import { historyTable, idField, timestampField } from './constants/constants';
import { LastHistoryError } from './errors/LastHistoryError';
import { errorMessages } from './errors/errorMessages';
// import MongoOperations from '../db/mongo/MongoOperations';
import { selectDb } from '../db/BaseDb';
// class HistoryService extends DataBaseOperations<History> {
// class HistoryService extends MongoOperations<History> {
const BaseDB = selectDb();
class HistoryService extends BaseDB<History> {

  private static instance: HistoryService;

  private constructor (tableName: string) {
    super (tableName);
  }

  public static getInstance(tableName: string): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService(tableName);
    }

    return HistoryService.instance;
  }

  public async save (equation: string, calculatedresult: string):Promise<History[] | void> {
    try {
      const inserts = await this.insert({ equation, calculatedresult}, idField);
      return inserts;
    } catch {
      return
    }
  }

  public async isLast(req: string): Promise<boolean> {
    try {
      const previous = await this.get(1);
      return previous && previous[0].equation === req;
    } catch {
      return false
    }
    
  }

  public async get (quantity: number): Promise<History[]> {
    return this.list({
      limit: quantity,
      orderBy: {
        field: timestampField,
        direction: 'desc'
      }
    })    
  }

  public async getMatchingEntry (equation: string, res: Response): Promise<History[]> {
    const match = await this.list({
      where: {equation: equation}
    });
    return match;
  }

  async beforeInsert(){
    if (await (this.isLast(this.record.equation!))) {
      throw new LastHistoryError(errorMessages.lastHistory);
    }
  }
}

export default HistoryService.getInstance(historyTable);