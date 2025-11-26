"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsers } from "@/app/api/Employe";
import { eduChainTestnet } from "@/app/utils/chains";
import type { Employee } from "@/types/Employe";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { createAllowcationAirdrop, getAllowcationAirdrop } from "../api/Salary";
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
        console.log(emp);
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

        const res = await getAllowcationAirdrop(Number(employee?.id_employe));

        if (res[0]?.month === dateNow && res[0]?.type === "createAndDeposit") {
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

  if (!salary || !employee) return;

  try {
    const res = await getWalletByUserId(Number(employee.id_users));
    if (!res?.address_wallet) {
      console.log("Wallet employee belum tersedia!");
      return;
    }

    const txRefund = await writeContractAsync({
      address: streamContract,
      abi: abiTokenPhii,
      functionName: "refundMax",
      args: [BigInt(streamIdUsers)],
      value: BigInt(0),
    });

    const txRefundReceipt = await waitForTransactionReceipt(publicClient, {
      hash: txRefund,
    });

    console.log("Transaction confirmed:", txRefundReceipt);

    const month = new Date().toLocaleString("en-US", { month: "long" });
    const type = "refundMax";
    const hash = txRefund;
    const streamIdString = streamIdUsers?.toString();
    const salaryRefund = "0";
  
      const createDatabaseRefund = await createAllowcationAirdrop(
        employee.id_employe,
        salaryRefund,
        month,
        type,
        hash,
        streamIdString
      );
      console.log(createDatabaseRefund);
    setIsSuccess(true);
    setIsError(false);
  } catch (err: any) {
    console.error(err);
    setIsSuccess(false);
    setIsError(true);
  }
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
