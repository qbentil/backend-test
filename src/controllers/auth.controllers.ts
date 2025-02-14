import * as Services from '../services';

import { NextFunction, Request, Response } from 'express';
import { __genUniqueCode, __generateCode } from '../helpers';

import { ResponseHandler } from '../handers';

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExist = await Services.getUser({ email: req.body.email });

    if (userExist) {
      new ResponseHandler(res).failure('User already exist');
    } else {
      const __code = await __genUniqueCode('User');
      const user = await Services.signup({
        ...req.body,
        code: __code
      });

      if (!user) {
        new ResponseHandler(res).failure('User not created');
      } else {
        new ResponseHandler(res).successWithData(user);
      }
    }
  } catch (e) {
    return next(e);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Services.login(req.body);

    if (!user) {
      new ResponseHandler(res).failure('User not found');
    } else {
      new ResponseHandler(res).successWithData(user);
    }
  } catch (e) {
    return next(e);
  }
};
