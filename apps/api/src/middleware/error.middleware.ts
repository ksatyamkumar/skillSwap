import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/errors";
import { logger } from "../config/logger";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Handle custom application errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Unexpected errors
  logger.error(error);

  return res.status(500).json({
  success: false,
  message: "Internal Server Error",
  ...(process.env.NODE_ENV === "development" && {
    stack: error instanceof Error ? error.stack : undefined,
  }),
});
}