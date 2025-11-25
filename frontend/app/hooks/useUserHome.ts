"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsersById } from "@/app/api/Employe";
import { getAllowcationAirdrop } from "@/app/api/Salary";
import { eduChainTestnet } from "@/app/utils/chains";
import { getUserIdFromToken } from "@/app/utils/cookies";
import { Employee } from "@/types/Employe";
import { SalaryAllocation } from "@/types/Salary";
import { useEffect, useState } from "react";
import { createPublicClient, http, parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract
} from "wagmi";
import { injected } from "wagmi/connectors";

export function useUserHome() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salary, setSalary] = useState<SalaryAllocation[]>([]);
  const [loading, setLoading] = useState(true);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
const { writeContractAsync } = useWriteContract();
const [isPending, setIsPending] = useState(false);
  const [statusWidraw, setStatusWidraw] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [remaining_balance, setRemainingBalance] = useState<any>();

  const publicClient = createPublicClient({
    chain: eduChainTestnet,
    transport: http(eduChainTestnet.rpcUrls.default.http[0]),
  });

  // Load user & salary data
  useEffect(() => {
    const loadData = async () => {
      const idUsers = getUserIdFromToken();
      if (!idUsers) return;

      const empRes = await EmployeUsersById(Number(idUsers));
      const empData = empRes?.data || [];
      setEmployees(empData);

      if (empData[0]) {
        const res = await getAllowcationAirdrop(empData[0].id_users);
        setSalary(res || []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const employee = employees[0];
  const salaryValue = salary.length > 0 ? Number(salary[0]?.salary) : 0;
  const amount = parseUnits(String(salaryValue), 18);

  const streamContract =
    process.env.NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS as `0x${string}`;

  const streamId = salary[0]?.streamId
    ? Number(salary[0]?.streamId)
    : 0;

  const {
    data: stream,
  } = useReadContract({
    address: streamContract,
    abi: abiTokenPhii,
    functionName: "getStream",
    args: [streamId],
  });

  // auto-update balance when stream changes
  useEffect(() => {
    if (!isConnected) {
      connect();
      return;
    }

    if (stream) {
      setRemainingBalance(stream);
    }
  }, [stream, isConnected, connect]);

  // Claim function
  const handleClaim = async () => {
    if (!isConnected) {
      connect();
      return;
    } 
    console.log(streamId, "WidrawMax");
    try {
       const withdrawMaxEmployee = await writeContractAsync({
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "withdrawMax",
        args: [streamId, address],
      });
      
      const txwithdrawMaxEmployee = await waitForTransactionReceipt(publicClient, {
        hash: withdrawMaxEmployee,
      });
      console.log("Transaction confirmed:", txwithdrawMaxEmployee);
      setIsError(false);
      setIsSuccess(true);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setIsError(true);
      setIsModalOpen(true);
    }
  };

  return {
    employee,
    salaryValue,
    loading,
    remaining_balance,
    handleClaim,
    isPending,
    statusWidraw,
    isSuccess,
    isError,
    isModalOpen,
    setIsModalOpen,
    setStatusWidraw,
    setIsSuccess,
    setIsError,
  };
}
