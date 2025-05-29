import { hash } from "bcryptjs";
import { createUser, findUserByEmail } from "./../../../lib/user";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 409 });
    }
    const hashedPassword = await hash(password, 12);
    const user = { name, email, password: hashedPassword, role: "user" };
    await createUser(user);
    const token = await new SignJWT({ email, name, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = new Response(JSON.stringify({ message: "User created" }), { status: 201 });
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`
    );

    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}
