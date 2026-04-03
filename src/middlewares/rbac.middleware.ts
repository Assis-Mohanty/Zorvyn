import { Response, NextFunction } from "express";

/* here req type is any because we are adding user property to it in auth middleware and user property is not defined in Request type of express,we would have to create a custom type for req to include user property but for simplicity we are using any type here */

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};