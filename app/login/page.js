"use client";

import { useState } from "react";
import Link from "next/link";
import LoginButton from "../components/LoginButton";
import { getToken } from "next-auth/jwt";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: new URLSearchParams({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <main className="max-w-md w-[100%] mx-auto h-[calc(100dvh-10rem)] p-6 flex flex-col justify-center backdrop-blur-md bg-white/0 border border-white/20 rounded-2xl m-2 shadow-lg text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2">
          Login
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-3 mb-5 text-sm text-gray-600">
        No account?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>

      <LoginButton />
    </main>
  );
}
