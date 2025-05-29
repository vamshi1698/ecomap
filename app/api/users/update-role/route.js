import { NextResponse } from "next/server";
import { updateUserRole } from "./../../../lib/user";

export async function POST(req) {
  const { email, role } = await req.json();
  const result = await updateUserRole(email, role);
  return NextResponse.json({ success: result.modifiedCount === 1 });
}
