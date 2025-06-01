import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { findUserByEmail, createUser } from "../../../lib/user";
import { decodeJwt } from "jose";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await findUserByEmail(credentials.email);
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, req }) {
      if (user) {
        let dbUser = await findUserByEmail(user.email);
        if (!dbUser) {
          dbUser = await createUser({
            email: user.email,
            name: user.name || "",
            role: "user",
          });
        }
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = dbUser?.role ?? "user";
      } else if (!token.role && token.email) {
        const dbUser = await findUserByEmail(token.email);
        token.role = dbUser?.role ?? "user";
      }

      if (req?.cookies) {
        const manualToken = req.cookies["token"];
        if (manualToken) {
          try {
            const decoded = decodeJwt(manualToken);
            token.role = decoded.role ?? token.role;
            token.name = decoded.name ?? token.name;
            token.email = decoded.email ?? token.email;
          } catch (e) {
            console.log(e)
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
