"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";

export default function SignupPageClient() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const { error } = await res.json();
      setError(error || "Signup failed");
    }
  };

  return (
    <main className="max-w-md w-[100%] mx-auto h-[calc(100dvh-10rem)] p-6 flex flex-col justify-center backdrop-blur-md bg-white/0 border border-white/20 rounded-2xl m-2 shadow-lg text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 mb-7">
          Create Account
        </button>
      </form>
      <LoginButton />
    </main>
  );
}
