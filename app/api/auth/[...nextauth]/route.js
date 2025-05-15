import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
