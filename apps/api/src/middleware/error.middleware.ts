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
  // Log every error
  logger.error({
  method: req.method,
  path: req.originalUrl,
  message:
    error instanceof Error
      ? error.message
      : "Unknown Error",
  stack:
    error instanceof Error
      ? error.stack
      : undefined,
});

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

  // mongodb duplicate key handling
  if (
  error &&
  typeof error === "object" &&
  "code" in error &&
  error.code === 11000
) {
  return res.status(409).json({
    success: false,
    message: "Resource already exists",
  });
}

// Add Mongo CastError
if (
  error &&
  typeof error === "object" &&
  "name" in error &&
  error.name === "CastError"
) {
  return res.status(400).json({
    success: false,
    message: "Invalid resource id",
  });
}

  return res.status(500).json({
  success: false,
  message: "Internal Server Error",
  ...(process.env.NODE_ENV === "development" && {
    stack: error instanceof Error ? error.stack : undefined,
  }),
});
}