'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()

    if (res.ok) {
      router.push('/login')
    } else {
      setError(data.message)
    }
  }

  return (
    <div className="h-[calc(100dvh-10em)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-3xl border border-green-300 shadow-2xl bg-[rgba(0,30,0,0.5)] backdrop-blur-sm space-y-4">
        <h1 className="text-3xl font-bold text-center text-green-100">Signup</h1>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded border bg-transparent border-green-400 text-white"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border bg-transparent border-green-400 text-white"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border bg-transparent border-green-400 text-white"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  )
}
