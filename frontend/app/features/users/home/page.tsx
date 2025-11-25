"use client";

import { useUserHome } from "@/app/hooks/useUserHome";

export default function PageUsersHome() {
  const {
    employee,
    salaryValue,
    loading,
    remaining_balance,
    handleClaim,
    isPending,
    isSuccess,
    isModalOpen,
    setIsModalOpen,
    isError,
  } = useUserHome();

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

          {/* Salary Details */}
          <div className="mt-7 bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 rounded-2xl border border-yellow-300 shadow-inner">
            <p className="text-gray-700 text-sm font-medium">
              Remaining Salary
            </p>

            <h2 className="text-4xl font-extrabold text-yellow-800 mt-1">
              {remaining_balance
                ? (
                  Number(remaining_balance.balance) /
                  10 ** remaining_balance.tokenDecimals
                ).toLocaleString()
                : 0} {" "}
              PHII
            </h2>

            <p className="text-gray-700 text-sm font-medium mt-2">
              Salary Mounthly:{" "}
              {salaryValue} PHII
            </p>
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={isPending}
            className="mt-8 w-full py-3 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-500 transition transform hover:-translate-y-0.5 shadow-md"
          >
            {isPending ? "Processing..." : "Claim Reward"}
          </button>
        </div>
      </div>

      {/* Modal Error */}
      {isModalOpen && isError && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-red-500">Error!</h2>
            <p className="mt-2 text-gray-700">
              Withdraw failed. Please try again.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {isModalOpen && isSuccess && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-green-500">Success!</h2>
            <p className="mt-2 text-gray-700">
              Withdraw has been successfully sent!
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
