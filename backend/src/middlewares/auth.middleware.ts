import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Roles } from "../db/models/User/user.interface";
const SECRET_KEY = process.env.JWT_SECRET || "secret";
interface JwtPayload {
 userId: number;
 role: Roles;
}
const auth = (req: Request<{}, {}, JwtPayload>, res: Response, next: NextFunction) => {
 const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
 if (token) {
  const payload = verifyToken<JwtPayload>(token);
  if (payload) {
   req.session.userId = payload.userId;
   req.session.role = payload.role;
   return next();
  }
 }
 res.status(401).json({ message: "Unauthorized" });
};
export function signToken<T extends object>(payload: T, expiresIn: string = "7d"): string {
 return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken<T>(token: string): T | null {
 try {
  return jwt.verify(token, SECRET_KEY) as T;
 } catch (err) {
  return null;
 }
}
export { auth };
