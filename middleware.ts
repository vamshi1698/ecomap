import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

const secretString = process.env.JWT_SECRET!;
const secretUint8 = new TextEncoder().encode(secretString);

async function verifyManualJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretUint8);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let token = await getToken({ req, secret: secretString });

  if (!token) {
    const cookieToken = req.cookies.get("token")?.value;
    if (cookieToken) {
      token = await verifyManualJWT(cookieToken);
    }
  }

  console.log("[Middleware] Token:", token);

  const publicPaths = ["/login", "/signup", "/favicon.ico", "/api/auth"];
  if (publicPaths.some(path => pathname.startsWith(path))) return NextResponse.next();
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) return NextResponse.next();

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const role = token.role ?? "user";

  if (pathname === "/login" && role === "user") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
