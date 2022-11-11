import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction
} from 'express';
import { ValidateError } from 'tsoa';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  console.log(err);
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(400).json({
      message: err?.fields[0]?.message,
      status: false
    });
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode || 400).json({
      message: err.message,
      status: false
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: false
    });
  }
  next();
};
