import { Request } from "express";
import { Roles } from "../db/models/User/user.interface";
import { BPDistricts, PropertyType } from "../db/models/Property/property.interface";

interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;
  phone: string;
}

interface UserResponseBody {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

type UResponseBody = UserResponseBody | ErrorResponse;

interface ErrorResponse {
  status?: number;
  message: string;
  details?: any;
}
interface CustomRequest extends Request {
  userId?: number;
}

interface PropertyParams {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  yearBuilt?: number;
  districts?: string | BPDistricts[];
  type?: PropertyType;
  listedByUserId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: string;
}

export { UserRequestBody, UResponseBody, ErrorResponse, CustomRequest, PropertyParams };
