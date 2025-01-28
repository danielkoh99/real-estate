/* eslint-disable unused-imports/no-unused-imports */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    savedProperties?: Property[];
    listedProperties?: Property[];
    createdAt?: string;
  }

  interface Session {
    user: User;
  }
  interface JWT {
    accessToken: string;
  }
}
