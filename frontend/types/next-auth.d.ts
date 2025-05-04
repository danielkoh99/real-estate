/* eslint-disable unused-imports/no-unused-imports */
import { DefaultSession, DefaultUser } from "next-auth";

import { User as AppUser } from "@/types";
declare module "next-auth" {
  interface User extends AppUser {
    accessToken: string;
  }

  interface Session {
    user: User;
  }
  interface JWT {
    accessToken: string;
  }
}
