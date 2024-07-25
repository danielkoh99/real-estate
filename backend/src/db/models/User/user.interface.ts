import Property from "../Property/Property";

interface UserAttributes {
  id: number;
  password: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: Roles;
  savedProperties?: string[];
  listedProperties?: string[];
}
enum Roles {
  agent = "agent",
  user = "user",
}

export { UserAttributes, Roles };
