import  { Response } from 'express';
import BaseDB from '../db/BaseDb';
import { historyTable, idField, equationField, resultField, timestampField } from './constants';

class History extends BaseDB {

  private static instance: History;

  private constructor (tableName: string) {
    super (tableName);
  }

  public static getInstance(tableName: string): History {
    if (!History.instance) {
      History.instance = new History(tableName);
    }

    return History.instance;
  }

  public async addEquationToHistory (equation: string, calculatedresult: string):Promise<boolean|void> {
    if (!(await this.isLastEntry(equation))) {
      return;
    }
    return  !!(await this.insert({ equation, calculatedresult}, idField));
  }

  public  async isLastEntry(req: string): Promise<boolean> {
    try {
      const previous = await this.getLastEntries(1);
      return !(previous && previous[0].equation === req);
    } catch {
      return false
    }
    
  }

  public async getLastEntries (quantity: number): Promise<any[]> {
    return this.list({
      limit: quantity,
      orderBy: {
        field: timestampField,
        direction: 'desc'
      }
    })    
  }

  public async findMatch (equation: string, res: Response): Promise<string> {
    const match = await this.list({
      where: {equation: equation}
    });
    return match[0]?.calculatedresult || null;
  }
}

export default History.getInstance(historyTable);