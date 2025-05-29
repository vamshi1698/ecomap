"use client";
import { useSession } from "next-auth/react";
import LogoutButton from './Logout';
import { LayoutDashboard, Trees } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const role = session?.user?.role;

  return (
    <header className='flex font-bold sticky top-0 w-full bg-[#0F1B1B] text-[#00E676] align-middle p-7 z-1000 justify-between items-center'>
      <div className="flex align-middle w-full logo justify-start gap-3 items-center">
        <Link href="/"><Trees className='text-[#E0F2F1] hover:text-[#1DE9B6]' /></Link>
        <h1 style={{ fontFamily: 'Playfair Display' }} className='text-[1.2rem]'>Eco Map</h1>
      </div>
      <nav className='flex w-full pr-4 align-middle justify-end gap-10 items-center'>
        {role === "admin" && (
          <Link href="/admin"><LayoutDashboard className='hover:text-green-500' /></Link>
        )}
        <LogoutButton />
      </nav>
    </header>
  );
}
