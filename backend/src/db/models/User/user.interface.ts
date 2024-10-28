interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
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
