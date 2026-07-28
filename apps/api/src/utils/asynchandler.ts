// import { Request, Response, NextFunction } from "express";

// type AsyncHandler = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => Promise<void>;

// export const asyncHandler =
//   (handler: AsyncHandler) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(handler(req, res, next)).catch(next);
//   };

import { Request, Response, NextFunction } from "express";

type AsyncHandler<P = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    handler: AsyncHandler<P, ResBody, ReqBody, ReqQuery>
  ) =>
  (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };