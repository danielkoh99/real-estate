import { Request } from "express";
import { Roles } from "../db/models/User/user.interface";

interface UserRequestBody {
  email: string;
  password: string;
  role: Roles;
}

interface UserResponseBody {
  id: number;
  email: string;
  accessToken: string;
}

// Define the union type for the response body
type UResponseBody = UserResponseBody | ErrorResponse;

interface ErrorResponse {
  status: number;
  message: string;
  details?: any;
}
interface CustomRequest extends Request {
  userId?: number;
}
export { UserRequestBody, UResponseBody, ErrorResponse, CustomRequest };
