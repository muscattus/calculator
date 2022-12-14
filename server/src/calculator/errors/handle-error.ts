import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';

export function handleError(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.code).json({message: err.message, name: err.name});
    return;
  }

  res.status(503).json({message: 'Server is temporarily unavailable', name: 'ServiceUnavailable'});
}
