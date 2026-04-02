import { NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../models/user.model";

export const authorize =
  (...roles: UserRole[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    if (roles.length === 0) {
      return next(new UnauthorizedError("No roles specified for authorization"));
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return next(
        new UnauthorizedError("Forbidden: insufficient permissions")
      );
    }

    next();
  };