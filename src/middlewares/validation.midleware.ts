import { NextFunction, Request, Response } from 'express';

import { AppConstants } from '../constants';
import { ResponseHandler } from '../handers';

export  const  ValidationMiddleware =(
  schema: any,
  property: string = AppConstants.REQUEST_TYPE.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = {
        abortEarly: true, // include all errors
        allowUnknown: false, // ignore unknown props
        convert: true
      };

      // @ts-ignore
      const { error } = schema.validate(req[property], options);
      if (!error) {
        return next();
      }

      const messages = error.details.map((err: any) => err.message).join(',');
      new ResponseHandler(res).failure(messages);
    } catch (error) {
      return next(error);
    }
  };
}
