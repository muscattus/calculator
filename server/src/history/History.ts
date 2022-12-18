import  { Response } from 'express';
import BaseDB from '../db/BaseDb';
import { Entry } from './interfaces'
import { historyTable, idField, equationField, resultField, timestampField } from './constants';

class History extends BaseDB<Entry> {

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

  public async addEquationToHistory (equation: string, calculatedresult: string):Promise<Entry[] | void> {
    if (!(await this.isLastEntry(equation))) {
      return;
    }
    const inserts = await this.insert({ equation, calculatedresult}, idField);
    return inserts;
  }

  public  async isLastEntry(req: string): Promise<boolean> {
    try {
      const previous = await this.getLastEntries(1);
      return !(previous && previous[0].equation === req);
    } catch {
      return false
    }
    
  }

  public async getLastEntries (quantity: number): Promise<Entry[]> {
    return this.list({
      limit: quantity,
      orderBy: {
        field: timestampField,
        direction: 'desc'
      }
    })    
  }

  public async findMatch (equation: string, res: Response): Promise<Entry[]> {
    const match = await this.list({
      where: {equation: equation}
    });
    return match;
  }
}

export default History.getInstance(historyTable);



// interface User {
//   id: number,
//   name: string
// }

// async function getResourse<T>(modelType: string): Promise<T[]> {
//   let response = await fetch(`/api/${modelType}`);
//   let json = await response.json();
//   return json
// }

// getResourse<User>('user')
//   .then((users) => {
//     users.map((user) => user.id = user.id+1)
//   })