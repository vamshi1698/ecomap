
import { Search } from 'lucide-react'
import Streets from './components/streets'
import { redirect } from 'next/navigation';

export default async function Home(){
    const res =await fetch("http://localhost:3000/api/streets",{
      cache:"no-store",
    }
  )

    async function handleSubmit(formData) {
      "use server";
      const street = formData.get("street")
      redirect(`/tree/${street}`)
    }
    const streets = await res.json()
    console.log("Look at me",streets)    
    return(
    <main className='p-4 '>
      <form  action={handleSubmit} className="flex mb-4 pr-10 p-4 text-[#E0F2F1] placeholder:[#80CBC4] rounded-2xl bg-[#122222] focus-within:border-[#103538]">
      <input
          type="text"
          className="w-full  outline-none"
          placeholder="Search for Streets..."
          name="street"
          id="street"
        />
        <Search className="hover:text-green-500" color="grey"/>
      </form>

      <div className="streets-list">
        <Streets streets={streets} />
      </div>
    </main>
    )
}