import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

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
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined,
      ) => {
        if (!credentials) return null;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            credentials,
          );

          if (response.status !== 200 || !response.data) {
            return null;
          }

          return { ...response.data };
        } catch (error: any) {
          throw new Error(
            error.response.data?.message || "An unknown error occurred",
          );
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? url : baseUrl;
    },
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
