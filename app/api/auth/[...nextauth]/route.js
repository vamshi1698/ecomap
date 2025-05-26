import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
      checks: ['pkce', 'state'],
      httpOptions: {
        timeout: 10000,
        fetch: fetchWithTimeout,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
