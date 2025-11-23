"use client";

import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

export const useWalletBalances = (
  eduToken: `0x${string}`,
  phiiToken: `0x${string}`
) => {
  const { address, isConnected } = useAccount();

  const {
    data: eduBalance,
    refetch: refetchEdu,
    isLoading: isLoadingEdu,
  } = useBalance({
    address: isConnected ? address : undefined,
    token: eduToken,
  });

  const {
    data: phiiBalance,
    refetch: refetchPhii,
    isLoading: isLoadingPhii,
  } = useBalance({
    address: isConnected ? address : undefined,
    token: phiiToken,
  });

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      refetchEdu();
      refetchPhii();
    }, 10_000);
    return () => clearInterval(interval);
  }, [isConnected, refetchEdu, refetchPhii]);

  return {
    address,
    isConnected,
    eduBalance,
    phiiBalance,
    isLoadingEdu,
    isLoadingPhii,
  };
};
