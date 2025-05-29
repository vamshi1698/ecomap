import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignupPageClient from "../components/SignupPageClient";
export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <SignupPageClient />;
}
