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

// Define the type for the error response
interface ErrorResponse {
  error_message: string;
}

// Define the union type for the response body
type UResponseBody = UserResponseBody | ErrorResponse;
export { UserRequestBody, UResponseBody };
