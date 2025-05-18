interface UserAttributes {
 id?: number;
 firstName: string;
 lastName: string;
 password?: string;
 email: string;
 phone?: string;
 createdAt?: Date;
 updatedAt?: Date;
 role: Roles;
 verified?: boolean;
 profileImage?: string;
 savedProperties?: string[];
 listedProperties?: string[];
}
enum Roles {
 agent = "agent",
 user = "user",
 admin = "admin",
}

export { UserAttributes, Roles };
