import { NextFunction, Request, Response } from 'express';

export const Errorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message || 'Something went wrong';
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message,
    success: false,
    stack: process.env.NODE_ENV === 'developement' ? err.stack : null
  });
};
