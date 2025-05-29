import { NextResponse } from "next/server";
import { getAllUsers } from "./../../lib/user";

export async function GET() {
  const users = await getAllUsers();
  return NextResponse.json(users);
}
