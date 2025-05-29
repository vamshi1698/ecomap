'use client';

import { SessionProvider } from "next-auth/react";
import NavBar from './Navbar';

export default function NavBarWrapper() {
  return (
    <SessionProvider>
      <NavBar />
    </SessionProvider>
  );
}
