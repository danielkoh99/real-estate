import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { ZodError } from "zod";

import { LoginResponse } from "@/types";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
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
          const response = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            credentials,
          );

          if (response.data) {
            return { ...response.data };
          }

          return null;
        } catch (error: any) {
          if (error instanceof ZodError) {
            return null;
          }

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
