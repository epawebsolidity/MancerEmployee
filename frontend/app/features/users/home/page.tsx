"use client";

import { useUserHome } from "@/app/hooks/useUserHome";

export default function PageUsersHome() {
  const { employee, salaryValue, loading, handleClaim, isPending } =
    useUserHome();

  console.log(salaryValue);

  console.log(employee);
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans text-black px-6 md:px-16 py-24">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-yellow-300 flex items-center justify-center text-xl font-semibold text-black shadow">
            {employee ? employee.name[0] : ""}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {loading ? "Loading..." : "Welcome Back,"}
            </h2>

            <p className="text-gray-600 text-lg font-semibold">
              {employee ? employee.name : "Unknown User"}
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-yellow-200 hover:shadow-xl transition-all">
          <h1 className="text-3xl font-bold tracking-wide">Monthly Salary</h1>

          <p className="text-gray-500 text-sm mt-1">
            Your PHII Salary allocation is ready to claim.
          </p>

          <div className="mt-7 bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 rounded-2xl border border-yellow-300 shadow-inner">
            <p className="text-gray-700 text-sm font-medium">
              Your Allocation Monthly Salary
            </p>

            <h2 className="text-4xl font-extrabold text-yellow-800 mt-1">
              {salaryValue} PHII
            </h2>
          </div>

          <button
            onClick={handleClaim}
            disabled={isPending}
            className="mt-8 w-full py-3 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-500 transition transform hover:-translate-y-0.5 shadow-md"
          >
            {isPending ? "Processing..." : "Claim Reward"}
          </button>
        </div>
      </div>
    </div>
  );
}
