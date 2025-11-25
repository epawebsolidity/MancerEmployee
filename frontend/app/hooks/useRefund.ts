"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsers } from "@/app/api/Employe";
import { eduChainTestnet } from "@/app/utils/chains";
import type { Employee } from "@/types/Employe";
import { useEffect, useState } from "react";
import {
    createPublicClient,
    http
} from "viem";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { createAllowcationAirdrop, getAllowcationAirdrop } from "../api/Salary";
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
        console.log(res);
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
  if (!employee) return; 

  const fetchBalanceUsers = async () => {
    setLoading(true);
    try {
      const dateNow = new Date().toLocaleString("en-US", { month: "long" });
      console.log(dateNow);

      const res = await getAllowcationAirdrop(employee.id_employe);

      if (
        res[0]?.month === dateNow &&
        res[0]?.type === "createAndDeposite"
      ) {
        setStreamIdUsers(res[0]?.streamId);
      }
    } catch (err) {
      console.error("Failed to fetch employee:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBalanceUsers();
}, [employee]);


   const handleSendReefund = async () => {
    if (!address) {
      await connect();
      return;
    }

    if (!employee) return;

    try {
      // Check wallet balance to make sure can pay gas
      const nativeBalance = await publicClient.getBalance({ address });
      if (nativeBalance === 0n) {
        console.error("Wallet native balance kosong → tidak bisa bayar gas");
        alert("Your wallet does not have enough native fees");
        return;
      }

      // Convert to BigInt if still string
      const streamIdBig = BigInt(streamIdUsers);

      console.log("Calling refundMax with:", {
        sender: address,
        streamId: streamIdBig.toString(),
      });

      const refundTx = await writeContractAsync({
        account: address,
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "refundMax",
        args: [streamIdBig],
      });

      console.log("Refund TX Hash:", refundTx);

      // Save to database
      const month = new Date().toLocaleString("en-US", { month: "long" });

      const createDatabase = await createAllowcationAirdrop(
        employee.id_employe,
        "0",               // refund doesn't need salary input
        month,            // month
        refundTx,         // tx hash
        "refundMax",      // type
        streamIdBig.toString()
      );

      console.log("Saved DB: ", createDatabase);

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Refund failed →", err?.cause || err);
      setIsSuccess(false);
      setIsError(true);
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