import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginButton from '../components/LoginButton'
export default async function LoginPage() {
  const token =(await cookies()).get('token')?.value

  if (token) {
    redirect('/dashboard')
  }
  return (
    <div className='h-[calc(100dvh-10em)]'>
      <form action="/api/login" method="POST" className="space-y-4 w-[80%] p-50 h-[100%] mx-auto mt-12 flex flex-col items-center justify-center rounded-3xl border-2 border-white shadow-4xl bg-[rgba(26,46,18,0.2)]">
      <h1 className="text-2xl font-bold">Login</h1>
      <input className="border p-2 w-full" type="text" name="username" placeholder="Username" required/>
      <input className="border p-2 w-full" type="password" name="password" placeholder="Password" required />
      <button className="bg-blue-600 text-white w-[100%] px-4 py-2 rounded " type="submit">Login</button>
    </form>
    <LoginButton />
    </div>
  )
}
