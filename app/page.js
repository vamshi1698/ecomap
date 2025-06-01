
import { Search } from 'lucide-react'
import Streets from './components/streets'
import { redirect } from 'next/navigation';
import ScrollFadePop from './components/ScrollFadePop';

export default async function Home(){
    const res =await fetch(`${process.env.NEXTAUTH_URL}/api/streets`,{
      cache:"no-store",
    }
  )

    async function handleSubmit(formData) {
      "use server";
      const street = formData.get("street")
      redirect(`${process.env.NEXTAUTH_URL}/tree/${street}`)
    }
    const streets = await res.json()
    
    return(
    <main className='p-4 '>
      <ScrollFadePop >            
      <form  action={handleSubmit} className="flex mb-4 pr-10 p-4 text-[#E0F2F1] placeholder:[#80CBC4] rounded-2xl bg-[#122222] focus-within:border-2 focus-within:border-[#103538]">
      <input
          type="text"
          className="w-full  outline-none"
          placeholder="Search for Streets..."
          name="street"
          id="street"
        />
        <Search className="hover:text-green-500" color="grey"/>
      </form>
      </ScrollFadePop >            

      <div className="streets-list">
        <Streets streets={streets} />
      </div>
    </main>
    )
}