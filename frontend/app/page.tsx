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
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-start sm:items-center sm:justify-center">
      {/* RED SHAPE (Mobile Only) */}
      <div
        className="
      absolute top-0 left-0 w-full h-[450px] 
      bg-red-600 
      [clip-path:ellipse(100%_70%_at_50%_20%)] 
      sm:hidden
    "
      ></div>

      <div className="relative w-full flex flex-col items-center z-10">
        {/* MOBILE HEADER (LOGO + TEXT) */}
        <div className="sm:hidden flex flex-col items-center justify-center mt-16">
          <Image
            src={logo}
            alt="Logo Perusahaan"
            width={140}
            height={140}
            className="rounded-full filter brightness-0 invert"
          />

          <h1
            className={`${poppins.className} text-white text-xl font-bold mt-6 w-full text-center`}
          >
            Welcome to Mancer App
          </h1>
          <h1
            className={`${poppins.className} text-white text-xs w-full text-center`}
          >
            Please sign in to continue
          </h1>
        </div>

        {/* LOGIN CARD */}
        <div className="relative w-full flex justify-center mt-10 px-8 sm:px-0">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="mb-6 text-center sm:text-left">
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
                disabled={loading}
                className="bg-red-600 text-white font-semibold w-full py-3 rounded-full hover:opacity-90 transition text-sm sm:text-base flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
