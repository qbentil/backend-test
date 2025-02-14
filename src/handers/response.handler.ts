import { ApiError, HttpStatus } from '../utils';

import { Response } from 'express';
import config from '../config';

export class ResponseHandler {
  constructor(public res: Response) {}

  failure(message: string) {
    this.res.status(HttpStatus.Success).json({
      success: false,
      message
    });

    return this;
  }

  failureWithData<T>(data: T, message: string) {
    this.res.status(HttpStatus.Success).json({
      success: false,
      data,
      message
    });

    return this;
  }

  success(message: string) {
    this.res.status(HttpStatus.Success).json({
      success: true,
      message
    });

    return this;
  }

  successWithData<T>(data: T) {
    this.res.status(HttpStatus.Success).json({
      success: true,
      data
    });

    return this;
  }

  error(error: ApiError) {
    this.res.status(error.statusCode ?? HttpStatus.InternalServerError).json({
      success: false,
      message: error.message,
      stack: config.app.env === 'development' ? error.stack : null
    });

    return this;
  }
}
