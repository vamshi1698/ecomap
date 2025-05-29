import { compare } from "bcryptjs";
import { findUserByEmail } from "../../../lib/user";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await findUserByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = await new SignJWT({
      email,
      name: user.name,
      role: user.role ?? "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = new Response(
      JSON.stringify({ message: "Logged in" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`
    );

    return response;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err && err.message ? err.message : "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
