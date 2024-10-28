import { Request } from "express";
import { Roles } from "../db/models/User/user.interface";

interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;
}

interface UserResponseBody {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

// Define the union type for the response body
type UResponseBody = UserResponseBody | ErrorResponse;

interface ErrorResponse {
  status?: number;
  message: string;
  details?: any;
}
interface CustomRequest extends Request {
  userId?: number;
}

interface PropertyQueryParams {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  type?: PropertyType;
  listedByUserId?: number;
  page?: number;
  limit?: number;
}
interface PropertyFilter {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  type?: PropertyType;
  listedByUserId?: number;
  page?: number;
  limit?: number;
}
enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
}
export { UserRequestBody, UResponseBody, ErrorResponse, CustomRequest, PropertyFilter, PropertyType, PropertyQueryParams };
