"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { parseUnits } from "viem";
import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { Employee } from "@/types/Employe";
import { getAllowcationAirdrop } from "@/app/api/Airdrop";
import { getUserIdFromToken } from "@/app/utils/cookies";
import { EmployeUsersById } from "@/app/api/Employe";
import { SalaryAllocation } from "@/types/Salary";

=======
import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { getAllowcationAirdrop } from "@/app/api/Airdrop";
import { EmployeUsersById } from "@/app/api/Employe";
import { eduChainTestnet } from "@/app/utils/chains";
import { getUserIdFromToken } from "@/app/utils/cookies";
import { Employee } from "@/types/Employe";
import { SalaryAllocation } from "@/types/Salary";
import { useEffect, useState } from "react";
import { createPublicClient, http, parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useConnect, useReadContract, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
>>>>>>> fa65e95 (first commit)
export function useUserHome() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salary, setSalary] = useState<SalaryAllocation[]>([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { writeContract, isPending } = useWriteContract();
=======
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { writeContract, isPending } = useWriteContract();
  const [statusWidraw, setStatusWidraw] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [remaining_balance, setRemainingBalance] = useState<any[]>([]);

  const publicClient = createPublicClient({
    chain: eduChainTestnet,
    transport: http(eduChainTestnet.rpcUrls.default.http[0]),
  });
>>>>>>> fa65e95 (first commit)

  useEffect(() => {
    const loadData = async () => {
      const idUsers = getUserIdFromToken();
      if (!idUsers) return;

      const empRes = await EmployeUsersById(Number(idUsers));
      const empData = empRes?.data || [];
      setEmployees(empData);

      const employee = empData[0];
      if (employee) {
        const res = await getAllowcationAirdrop(employee.id_users);
        console.log(res);
        setSalary(res || []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

<<<<<<< HEAD
=======

>>>>>>> fa65e95 (first commit)
  const employee = employees[0];
  const salaryValue = salary.length > 0 ? Number(salary[0]?.salary) : 0;

  const decimals = 18;
  const amount = parseUnits(String(salaryValue), decimals);
<<<<<<< HEAD
=======
  const streamId = Number(salary[0]?.streamId);
  const streamContract = process.env
    .NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS as `0x${string}`;


  const { data: stream, isError: streamErr } = useReadContract({
    address: streamContract,
    abi: abiTokenPhii,
    functionName: "getStream",
    args: [streamId],
  });

 useEffect(() => {
  if (stream && isConnected) {
    setRemainingBalance(stream);
  } else if (!isConnected) {
    connect();
  }
}, [stream, isConnected, connect]);
>>>>>>> fa65e95 (first commit)

  const handleClaim = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    try {
<<<<<<< HEAD
      await writeContract({
        address: process.env.NEXT_PUBLIC_PHII_CONTRACT_ADDRESS as `0x${string}`,
        abi: abiTokenPhii,
        functionName: "withdrawMax",
        args: [amount, address],
      });

      alert("Reward claimed!");
    } catch (error) {
      console.error(error);
      alert("Failed to claim reward");
    }
  };

=======
      const withdrawMaxEmployee = await writeContract({
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



  const handleRefunMax = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    try {
      const streamIdRaw = salary[0]?.streamId;
      if (!streamIdRaw) throw new Error("streamId not found");

      const streamIdBigInt = typeof streamIdRaw === "bigint" ? streamIdRaw : BigInt(streamIdRaw);
      console.log("streamIdBigInt:", streamIdBigInt);

      const refundMaxUsers = await writeContract({
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "refundMax",
        args: [BigInt(streamIdBigInt)],
        value: 0n,
      });

      const receipt = await waitForTransactionReceipt(publicClient, {
        hash: refundMaxUsers.hash,
      });
      console.log("Transaction confirmed:", receipt);

      setIsError(false);
      setIsSuccess(true);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to refund:", err);
      setIsSuccess(false);
      setIsError(true);
      setIsModalOpen(true);
    }
  };



>>>>>>> fa65e95 (first commit)
  return {
    employee,
    salaryValue,
    loading,
<<<<<<< HEAD
    handleClaim,
    isPending,
=======
    statusWidraw,
    isSuccess,
    isModalOpen,
    isError,
    remaining_balance,
    handleClaim,
    handleRefunMax,
    isPending,
    setStatusWidraw,
    setIsModalOpen,
    setIsSuccess,
    setIsError,
    setRemainingBalance
>>>>>>> fa65e95 (first commit)
  };
}
