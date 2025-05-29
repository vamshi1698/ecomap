"use client"
import { SessionProvider } from 'next-auth/react'
import LoginPage from './../components/LoginWrapper'
export default function Login(){
  return(
    <SessionProvider>
      <LoginPage />
    </SessionProvider>
  )
}