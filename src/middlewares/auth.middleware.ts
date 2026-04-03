import { Response, NextFunction } from "express";
import { verifyJWT } from "../utils/helpers/jwt.helper";

export const authenticate = (req: any, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyJWT(token, process.env.JWT_SECRET as string) as any;

    req.user = payload; // attach user

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};