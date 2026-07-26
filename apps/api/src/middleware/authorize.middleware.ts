import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  UnauthorizedError,
  ForbiddenError,
} from "../shared/errors";

export function authorize(...roles: string[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      return next(
        new UnauthorizedError("Authentication required")
      );
    }

    const hasPermission = roles.includes(req.user.role);

    if (!hasPermission) {
      return next(
        new ForbiddenError(
          "You do not have permission to perform this action"
        )
      );
    }

    next();
  };
}