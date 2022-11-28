import { pg } from "./knex";
import  { Request, Response, NextFunction } from 'express';

export const db = {
  select: (req: Request, res: Response) => {
      pg.select().from('calculationslog').then((users:any) => {
      return res.json(users);
    })
    .catch((err: any) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
  },

  log: (req: string, res: string) => {
    pg('calculationslog')
      .insert(
        [
          { equation: req, calculatedresult: res}, 
        ], 
        ['id']
      )
      .then( function (result: any) {
        console.log(result);     // respond back to request
     })
     .catch((e: any) => {
      console.log(e);
     })
    },

    getLast: (quantity: number, res: any) => {
      pg.select('equation', 'calculatedresult').from('calculationslog').orderBy('calculatedat', 'desc').limit(quantity)
      .then((users:any) => {
        console.log(users);
        return res.json(users);
      }).catch((e: any) => console.log(e))
    },

    findMatch: (equation: string) => {
      pg.select('calculatedresult').from ('calculationslog').where({equation: equation})
      .then((result: any) => console.log(result))
    }
}