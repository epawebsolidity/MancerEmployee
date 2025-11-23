"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import logo from "@/public/assets/images/logo-mancer.png";
import { useState } from "react";
import { useLogin } from "@/app/hooks/useLogin";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function LoginForm() {
  const { login, loading, error, setError } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="flex items-center sm:justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative flex flex-col items-center justify-start w-full sm:justify-center sm:items-center">
        <div className="h-[300px] w-full bg-red-600 [clip-path:ellipse(80%_80%_at_30%_30%)] sm:hidden flex justify-center items-start">
          <div className="flex flex-col items-center justify-center mt-14">
            <Image
              src={logo}
              alt="Logo Perusahaan"
              width={140}
              height={140}
              className="rounded-full filter brightness-0 invert"
            />
            <h1
              className={`${poppins.className} text-white text-xl font-bold mt-8 w-full`}
            >
              Welcome to Mancer App
            </h1>
            <h1
              className={`${poppins.className} text-white text-xs text-right w-full`}
            >
              Please sign in to continue
            </h1>
          </div>
        </div>

        <div className="relative w-full flex justify-center -mt-24 z-10 px-8 sm:px-0 sm:-mt-0">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-gray-800 text-2xl font-bold">Sign In</h1>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-600 w-full p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-600 w-full p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className="bg-red-600 text-white font-semibold w-full py-3 rounded-full hover:opacity-90 transition text-sm sm:text-base flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
