"use client";

import { useUserHome } from "@/app/hooks/useUserHome";

export default function TxHistoryUserEmploye() {

  const {
    userstxHistory
  } = useUserHome();

  console.log("History:", userstxHistory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans text-black px-6 md:px-16 py-24">
      <div className="w-full max-w-xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 text-gray-900">History Transaction</h1>

        {/* Jika tidak ada data */}
        {(!userstxHistory || userstxHistory.length === 0) && (
          <p className="text-gray-600 text-sm text-center mt-10">
            No transaction yet.
          </p>
        )}

        {/* LIST HISTORY */}
        <div className="space-y-4">
          {userstxHistory?.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">

                {/* Left info */}
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {item?.type === "withdrawMax" ? "Withdraw" : "Deposit"}
                  </p>

                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-600">Month:</span>{" "}
                      {item?.month}
                    </p>

                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-600">Stream ID:</span>{" "}
                      {item?.streamId}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="text-right">
                  <p className="font-semibold text-blue-600 text-sm">
                    {Number(item?.salary).toFixed(6)} PHII
                  </p>

                  <span
                    className={`inline-block mt-2 px-2 py-1 text-[10px] rounded-full font-medium ${item?.type === "withdrawMax"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {item?.type}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <button
                  className="text-xs px-4 py-1.5 rounded-md font-medium bg-[#f9140D] hover:bg-red-700 text-white shadow-sm transition"
                  onClick={() =>
                    window.open(
                      `https://edu-chain-testnet.blockscout.com/tx/${item?.hash}`,
                      "_blank"
                    )
                  }
                >
                  View Transaction
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
}
