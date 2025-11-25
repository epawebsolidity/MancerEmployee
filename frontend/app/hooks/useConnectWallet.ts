"use client";

import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { createWalletUser, getWalletByUserId } from "@/app/api/Wallet";
import { getUserIdFromToken } from "@/app/utils/cookies";

export function useWalletHandler() {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleWallet = async () => {
      try {
        if (isConnecting) return;
        if (!isConnected || !address) return;

        const userId = getUserIdFromToken();
        if (!userId) return;

        const checkingWallet = await getWalletByUserId(userId);

        if (!checkingWallet || !checkingWallet.address_wallet) {
          console.log("DB empty or wallet empty → creating new wallet");
          await createWalletUser(userId, address);
          return;
        }

        if (checkingWallet.address_wallet !== address) {
          console.log("Wrong wallet → disconnecting only");
          await disconnect();
        }
      } catch (err) {
        console.error("Wallet error:", err);
      }
    };

    handleWallet();
  }, [isConnected, address, isConnecting, disconnect]);

  return { address, isConnected, isConnecting };
}
