"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsers } from "@/app/api/Employe";
import { eduChainTestnet } from "@/app/utils/chains";
import type { Employee } from "@/types/Employe";
import { parseUnits } from "ethers";
import { useEffect, useState } from "react";
import {
    createPublicClient,
    http
} from "viem";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { getAllowcationAirdrop } from "../api/Salary";
import { getWalletByUserId } from "../api/Wallet";
export const useRefund = (id: string | number) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [streamIdUsers, setStreamIdUsers] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const { address, isConnected } = useAccount();
  const [salary, setSalary] = useState<SalaryAllocation[]>([]);
  const { connect } = useConnect({ connector: injected() });
  const { writeContractAsync } = useWriteContract();
  //const [streamId, setStreamId] = useState<number | null>(null);
  const token = process.env.NEXT_PUBLIC_PHII_CONTRACT_ADDRESS as `0x${string}`;
  const streamContract = process.env
    .NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS as `0x${string}`;

  const publicClient = createPublicClient({
    chain: eduChainTestnet,
    transport: http(eduChainTestnet.rpcUrls.default.http[0]),
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await EmployeUsers();
        const emp = res.data.find((e: Employee) => e.id_employe === Number(id));
        setEmployee(emp || null);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

   useEffect(() => {
    const fetchBalanceUsers = async () => {
      setLoading(true);
      try {
        console.log("useEffect", employee?.id_employe);
        const dateNow = new Date().toLocaleString("en-US", { month: "long" });
        console.log(dateNow);
        const res = await getAllowcationAirdrop(employee?.id_employe || 0);
        if(res.month === dateNow && res.type === "createAndDeposite"){
          setStreamIdUsers(res[0]?.sreamId);
        }
        return;
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceUsers();
  }, []);

  const handleSendReefund = async () => {
    if (!address) {
      await connect();
      return;
    }

    if (!salary || !employee) return;

    try {
      const res = await getWalletByUserId(Number(employee.id_users));
      if (!res?.address_wallet) {
        console.log("Wallet employee belum tersedia!");
        return;
      }
      const recipient: `0x${string}` = res.address_wallet;
      const amount = parseUnits(salary || "0", 18); // misal salary="10" → 10*10^18
      const duration = BigInt(30 * 24 * 60 * 60); // 30 hari dalam detik
      const ratePerSecond = amount / duration;

      console.log("amount:", amount.toString());
      console.log("ratePerSecond:", ratePerSecond.toString());

      console.log(amount);

      const wRufund = await writeContractAsync({
        account: address,
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "createAndDeposit",
        args: [address],
      });

      console.log(wRufund, "Rufund Log");
      setIsSuccess(true);
      setIsError(true);
      console.log("Reward sent successfully!");
    } catch (err) {
      setIsSuccess(false);
      setIsError(true);
      console.error("Failed to send reward:", err);
    }
    setIsModalOpen(true);
  };
  return {
    employee,
    streamIdUsers,
    isSuccess,
    isModalOpen,
    isError,
    salary,
    setStreamIdUsers,
    loading,
    handleSendReefund,
    setIsSuccess,
    setIsModalOpen,
    setIsError,
    setSalary,
  };
};