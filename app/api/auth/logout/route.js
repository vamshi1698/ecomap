import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("next-auth.session-token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  response.cookies.set("next-auth.csrf-token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  response.cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return response;
}
