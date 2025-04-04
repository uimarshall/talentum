import { ErrorRequestHandler } from 'express';
import { HTTPSTATUS } from '../config/http.config';
import { AppErrorHandler } from '../shared/utils/appErrorHandler';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error occurred on PATH: ${req.path}`, err);
  // Syntax error
  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      status: 'error',
      message: 'Bad Request',
      error: err?.message || 'Invalid JSON format',
    });
  }

  if (err instanceof AppErrorHandler) {
    return res.status(err.statusCode).json({ message: err.message, errorCode: err.errorCode });
  }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err?.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
