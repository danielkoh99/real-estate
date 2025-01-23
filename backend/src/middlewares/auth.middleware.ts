import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../logger/logger";
const SECRET_KEY = process.env.JWT_SECRET || "secret";
interface JwtPayload {
  userId: number;
}
const auth = (req: Request<{}, {}, JwtPayload>, res: Response, next: NextFunction) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      req.session.userId = payload.userId;
      return next();
    }
  }
  res.status(401).json({ message: "Unauthorized" });
};
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (err) {
    return null;
  }
}

export { auth };
