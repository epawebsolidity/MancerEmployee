"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsers } from "@/app/api/Employe";
import { eduChainTestnet } from "@/app/utils/chains";
import type { Employee } from "@/types/Employe";
import { parseUnits } from "ethers";
import { useEffect, useState } from "react";
import { createPublicClient, decodeEventLog, erc20Abi, http } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { createAllowcationAirdrop } from "../api/Salary";
import { getWalletByUserId } from "../api/Wallet";

export const useDeposite = (id: string | number) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salary, setSalary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const { address, isConnected } = useAccount();
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

  const handleSendReward = async () => {
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
      const amount = parseUnits(salary || "0", 18);
      const duration = BigInt(30 * 24 * 60 * 60);
      const ratePerSecond = amount / duration;

      console.log("amount:", amount.toString());
      console.log("ratePerSecond:", ratePerSecond.toString());

      console.log(amount);

      const allowance = await publicClient.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, streamContract],
      });

      if (allowance < amount) {
        console.log("Allowance kurang, perlu approve dulu...");
        await writeContractAsync({
          account: address,
          address: token,
          abi: erc20Abi,
          functionName: "approve",
          args: [streamContract, amount],
        });

        console.log("Approve selesai");
      } else {
        console.log("Allowance cukup, tidak perlu approve");
      }

      const createTx = await writeContractAsync({
        account: address,
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "createAndDeposit",
        args: [address, recipient, ratePerSecond, token, true, amount],
      });

      const receipt = await waitForTransactionReceipt(publicClient, {
        hash: createTx,
      });

      let streamId: bigint | null = null;

      for (const log of receipt.logs) {
        try {
          const decoded = decodeEventLog({
            abi: abiTokenPhii,
            data: log.data,
            topics: log.topics,
          });

          if (decoded.eventName === "DepositFlowStream") {
            streamId = decoded.args.streamId as bigint;
            break;
          }
        } catch (err) {
          console.error("Error decoding event log:", err);
        }
      }

      if (!streamId) {
        throw new Error("streamId tidak ditemukan dari event log");
      }

      console.log("streamId:", streamId?.toString());
      const dateNow = new Date().toLocaleString("en-US", { month: "long" });
      console.log(dateNow);
      const month = dateNow;
      const hash = createTx;
      const type = "createAndDeposit";
      const streamIdFromTx = streamId;
      const streamIdString = streamIdFromTx?.toString();
      const createDatabase = createAllowcationAirdrop(
        employee.id_employe,
        salary,
        month,
        type,
        hash,
        streamIdString
      );
      console.log(createDatabase, "simpan ke database");
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
    salary,
    isSuccess,
    isModalOpen,
    isError,
    setSalary,
    loading,
    handleSendReward,
    setIsSuccess,
    setIsModalOpen,
    setIsError,
  };
};
