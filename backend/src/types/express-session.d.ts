import "express-session";
import { Roles } from "../db/models/User/user.interface";

declare module "express-session" {
 interface Session {
  userId?: number;
  role?: Roles;
 }
}
