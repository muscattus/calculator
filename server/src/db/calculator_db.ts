import { pg } from "./knex";
import  { Request, Response, NextFunction } from 'express';

function select (req: Request, res: Response) {
      pg.select().from('calculationslog').then((users:any) => {
      return res.json(users);
    })
    .catch((err: any) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
  }

async function logEquation (req: string, res: string) {
    const previous = await getLast(1);
    if (previous && previous[0].equation === req){
      return
    }
    return pg('calculationslog')
      .insert(
        [
          { equation: req, calculatedresult: res}, 
        ], 
        ['id', 'equation', 'calculatedresult']
      )
      .then((result: any) => {
        result = result[0];
        if (result.id && result.equation && result.calculatedresult) {
          return true;     // respond back to request
        }
        return false;
     })
     .catch((e: any) => {
      console.log(e);
     })
    }

async function getLast (quantity: number, res?: any) {
      return pg.select('equation', 'calculatedresult').from('calculationslog').orderBy('calculatedat', 'desc').limit(quantity)
      .then((lastRecords:any) => {
        return lastRecords;
      }).catch((e: any) => console.log(e))
    }

async function findMatch (equation: string, res: Response): Promise<any> {
      return pg
        .select('calculatedresult')
        .from ('calculationslog')
        .where({equation: equation})
        .limit(1)
        .then((match: any) => {
          if (match.length > 0) {
            return match[0].calculatedresult;
          }
        })
    }

export const db = {
  select,
  logEquation,
  getLast,
  findMatch
} 