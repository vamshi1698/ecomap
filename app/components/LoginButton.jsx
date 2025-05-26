'use client'

import { signIn } from "next-auth/react"

export default function LoginButton() {
  return (
    <button
      type="button"
      onClick={()=>signIn('google')}
      className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors shadow-md"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.15 0 5.94 1.16 8.15 3.07l6.1-6.1C34.45 2.48 29.5 0 24 0 14.64 0 6.68 5.97 2.72 14.63l7.93 6.15C12.52 13.44 17.76 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.15 24.54c0-1.44-.12-2.83-.34-4.17H24v7.9h12.44c-.54 2.89-2.17 5.34-4.64 6.98v5.65h7.5c4.39-4.04 6.9-10 6.9-16.36z"
        />
        <path
          fill="#4A90E2"
          d="M9.17 28.07a14.49 14.49 0 010-8.14v-5.66H1.64A23.93 23.93 0 000 24c0 3.8.88 7.4 2.44 10.6l6.73-6.53z"
        />
        <path
          fill="#FBBC05"
          d="M24 48c6.5 0 12-2.13 16.01-5.78l-7.5-5.66c-2.07 1.38-4.72 2.18-8.51 2.18-6.24 0-11.48-3.94-13.35-9.52l-7.93 6.15C6.68 42.03 14.64 48 24 48z"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  )
}
