"use client";

import { useUserHome } from "@/app/hooks/useUserHome";

export default function TxHistoryUserEmploye() {
  const { userstxHistory } = useUserHome();

  console.log("History:", userstxHistory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans text-black px-6 md:px-16 py-24">
      <div className="w-full max-w-xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">History Transaction</h1>

        {/* Jika tidak ada data */}
        {(!userstxHistory || userstxHistory.length === 0) && (
          <p className="text-gray-600 text-sm">No transaction yet.</p>
        )}

        {/* LIST HISTORY */}
        <div className="space-y-4">
          {userstxHistory?.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item?.type === "withdrawMax" ? "Withdraw" : "Deposit"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Month: {item?.month}
                  </p>
                  <p className="text-xs text-gray-500">
                    Stream ID: {item?.streamId}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-700 text-sm">
                    {Number(item?.salary).toFixed(6)} PHII
                  </p>

                  <span className="inline-block mt-2 px-2 py-1 text-[10px] rounded-full bg-blue-100 text-blue-600 font-medium">
                    {item?.type}
                  </span>
                </div>
              </div>

              <button
                className="text-xs px-3 py-1.5 rounded-full bg-[#f9140D] border border-white/30 text-white hover:opacity-90 transition"
                onClick={() =>
                  window.open(
                    `https://edu-chain-testnet.blockscout.com/tx/${item?.hash}`,
                    "_blank"
                  )
                }
              >
                View
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
