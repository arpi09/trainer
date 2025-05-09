import { Request, Response, NextFunction, RequestHandler } from "express";

export function asyncHandler(fn: RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}