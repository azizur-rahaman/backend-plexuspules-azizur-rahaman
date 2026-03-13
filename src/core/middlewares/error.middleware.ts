import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

  return res.status(statusCode).json({
    status,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
