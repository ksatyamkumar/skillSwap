import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};