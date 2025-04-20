import {CircleUserRound,LayoutDashboard,Trees } from 'lucide-react';
import Link from 'next/link';
export default async function NavBar(){
    const role = "user"
    return <header  className='flex font-bold sticky top-0 w-full bg-[#0F1B1B] text-[#00E676] align-middle p-7 justify-between items-center'>
    <div className="flex align-middle w-full logo justify-start gap-3 items-center">
        <Link href="/"><Trees className='text-[#E0F2F1] hover:text-[#1DE9B6]'/></Link>
        <h1 style={{fontFamily:'Playfair Display'}} className='text-[1.2rem]'>Eco Map</h1>
    </div>
    <nav className='flex  w-full pr-4 align-middle justify-end gap-10 items-center'>
        {(role == "admin") && <Link href="/admin"><LayoutDashboard className='hover:text-green-500'/></Link>}
        {(role=="user" || role == "admin") && <Link href="/profile"><CircleUserRound className='hover:text-green-500'/></Link>}
        <Link href="/logout" className='pointer bg-[#00E676] text-[#000000] rounded-full px-6 py-2'>LogOut</Link>
    </nav>
</header>
}