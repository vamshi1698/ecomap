import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtVerify } from 'jose'
import LoginButton from '../components/LoginButton'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

export default async function LoginPage() {
  const cookieStore =await   cookies()
  const token = cookieStore.get('next-auth.session-token')?.value 
    || cookieStore.get('__Secure-next-auth.session-token')?.value

  if (token) {
    try {
      await jwtVerify(token, secret)
      // If verification passes, redirect to dashboard
      redirect('/dashboard')
    } catch {
      // Invalid token: do nothing and let login render
    }
  }

  return (
    <div className="h-[calc(100dvh-10em)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-3xl border border-green-300 shadow-2xl bg-[rgba(0,30,0,0.5)] backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-100">Login</h1>
        <form action="/api/auth/login" method="POST" className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full p-3 rounded bg-transparent border border-green-400 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded bg-transparent border border-green-400 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
