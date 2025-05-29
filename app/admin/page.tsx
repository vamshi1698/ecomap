"use client"
import AdminPageWrapper from "./AdminPageWrapper";
import { SessionProvider } from "next-auth/react";
export default function AdminPageRoot() {
  return(
  <SessionProvider >
      <AdminPageWrapper />;
  </SessionProvider>
  )
}
