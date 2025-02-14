import { NextFunction, Request, Response } from 'express';
import { SYS_USER_TYPE, TokenPayload } from '../types';

import { CreateError } from '../utils';
import { __validateAuthToken } from '../helpers';
import config from '../config';
import jwt from 'jsonwebtoken';

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(CreateError(401, 'Access denied'));
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(CreateError(402, 'Access denied'));
    }
    const decoded = await __validateAuthToken(token);

    if (!decoded) {
      return next(CreateError(403, 'Access denied'));
    }

    // append token to decoded object and set the new object to req.user
    req.tokenPayload = decoded;
    next();
  } catch (error: any) {
    next(error);
  }
};

export const AuthenticateUserbyRole = (role: SYS_USER_TYPE) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.tokenPayload) {
      return next(CreateError(401, 'Access denied'));
    }
    if (req.tokenPayload.role !== role) {
      return next(CreateError(403, 'Access denied'));
    }
    next();
  };
};
