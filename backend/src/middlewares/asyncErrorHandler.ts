import { type NextFunction, type Request, type Response } from 'express';

type AsyncFunctionType = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncErrorHandler =
  (fn: AsyncFunctionType): AsyncFunctionType =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
// This middleware is used to handle errors in async route handlers. It catches any errors that occur during the execution of the async function and passes them to the next middleware (usually an error handler).
