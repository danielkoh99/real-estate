/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    user: {
      accessToken: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    accessToken: string;
  }
}
