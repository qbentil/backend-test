import { HttpStatus } from "./response.utils";

/**
 * ApiError extends Error
 *
 * Takes the error message and status code (HttpStatus.Success = 200)
 */
export class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode: number = HttpStatus.Success) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const CreateError = (code: number, message: string) => {
  const error = new Error() as any;
  error.message = message;
  error.statusCode = code;
  return error;
};
