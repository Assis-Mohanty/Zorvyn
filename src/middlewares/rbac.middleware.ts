import { verifyJWT } from "../utils/helpers/jwt.helper";

export const isAdmin = (req: any, res: any, next: any) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  if (!jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = verifyJWT(jwt, process.env.JWT_SECRET as string) as any;
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
export const isAnalyst = (req: any, res: any, next: any) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  if (!jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = verifyJWT(jwt, process.env.JWT_SECRET as string) as any;
    if (payload.role !== "analyst") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
export const isViewer = (req: any, res: any, next: any) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  if (!jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = verifyJWT(jwt, process.env.JWT_SECRET as string) as any;
    if (payload.role !== "viewer") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
