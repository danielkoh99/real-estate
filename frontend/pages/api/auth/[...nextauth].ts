import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { ZodError } from "zod";

import { LoginResponse } from "@/types";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Parse credentials using Zod

          // Prepare API data for login request

          // Perform Axios request and wait for the response
          const response = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            credentials,
          );

          // Assuming response.data contains necessary information to map to the User
          if (response.data) {
            // Map the response data to User type

            return { ...response.data }; // Return the mapped User object
          }

          // Return null if response doesn't contain user data
          return null;
        } catch (error: any) {
          // Handle Zod validation error
          if (error instanceof ZodError) {
            return null; // Return null for invalid credentials
          }

          // Handle any other errors (e.g., Axios errors)
          throw new Error(
            error.response.data?.message || "An unknown error occurred",
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
