"use client";

import { abiTokenPhii } from "@/abi/abiTokenPhii";
import { EmployeUsersById } from "@/app/api/Employe";
import {
  createAllowcationAirdrop,
  getAllowcationAirdrop,
} from "@/app/api/Salary";
import { eduChainTestnet } from "@/app/utils/chains";
import { getUserIdFromToken } from "@/app/utils/cookies";
import { Employee } from "@/types/Employe";
import { SalaryAllocation } from "@/types/Salary";
import { useEffect, useState } from "react";
import { createPublicClient, decodeEventLog, http, parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";

export function useUserHome() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salary, setSalary] = useState<SalaryAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userstxHistory, setUserstxHistory] = useState<string>("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { writeContractAsync } = useWriteContract();
  const [isPending, setIsPending] = useState(false);
  const [statusWidraw, setStatusWidraw] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [remaining_balance, setRemainingBalance] = useState<any>();
  const employee = employees[0];
  const salaryValue = salary.length > 0 ? Number(salary[0]?.salary) : 0;
  const amount = parseUnits(String(salaryValue), 18);

  const streamContract = process.env
    .NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS as `0x${string}`;

  const streamId = salary[0]?.streamId ? Number(salary[0]?.streamId) : 0;

  const publicClient = createPublicClient({
    chain: eduChainTestnet,
    transport: http(eduChainTestnet.rpcUrls.default.http[0]),
  });

  useEffect(() => {
    const loadData = async () => {
      const idUsers = getUserIdFromToken();
      if (!idUsers) return;

      const empRes = await EmployeUsersById(Number(idUsers));
      const empData = empRes?.data || [];
      setEmployees(empData);

      if (empData[0]) {
        const res = await getAllowcationAirdrop(empData[0].id_employe);
        setSalary(res || []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
  if (!employee) return;

  const fetchTransactionUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllowcationAirdrop(Number(employee.id_employe));

      console.log("RES RAW:", res);

      if (Array.isArray(res)) {
        const withdrawData = res.find(
          (item) => item.type === "withdrawMax"
        );

        console.log("TYPE FOUND:", withdrawData);

        if (withdrawData) {
          setUserstxHistory(withdrawData);
        }
      }

    } catch (err) {
      console.error("Failed to fetch employee:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchTransactionUsers();
}, [employee]);


  const { data: stream } = useReadContract({
    address: streamContract,
    abi: abiTokenPhii,
    functionName: "getStream",
    args: [streamId],
  });

  useEffect(() => {
    if (!isConnected) {
      connect();
      return;
    }

    if (stream) {
      setRemainingBalance(stream);
    }
  }, [stream, isConnected, connect]);

  const handleClaim = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    if (!streamId) {
      console.log("streamId is null, cannot withdraw");
      return;
    }

    console.log(streamId, "WithdrawMax");

    try {
      const withdrawMaxEmployee = await writeContractAsync({
        address: streamContract,
        abi: abiTokenPhii,
        functionName: "withdrawMax",
        args: [streamId, address],
      });

      const txReceipt = await waitForTransactionReceipt(publicClient, {
        hash: withdrawMaxEmployee,
      });
      console.log("Transaction confirmed:", txReceipt);

      const relevantLogs = txReceipt.logs.filter(
        (log) => log.address.toLowerCase() === streamContract.toLowerCase()
      );

      console.log("Relevant logs:", relevantLogs);
      let amountWithdraw: bigint | null = null;

      for (const log of txReceipt.logs) {
        try {
          const parsedLog = decodeEventLog({
            abi: abiTokenPhii,
            data: log.data,
            topics: log.topics,
          });

          console.log("DECODED LOG:", parsedLog);

          if (parsedLog.eventName === "WithdrawFromFlowStream") {
            amountWithdraw = parsedLog.args.withdrawAmount as bigint;
            console.log("Withdraw amount =", amountWithdraw.toString());
          }
          if (parsedLog.eventName === "Refund") {
            console.log("Refund streamId =", parsedLog.args.streamId.toString());
          }

        } catch (err) {
          console.warn("Log decode failed:", err);
        }
      }

      const decimals = 18;
      const formatted =
        amountWithdraw
          ? Number(amountWithdraw) / 10 ** decimals
          : 0;

      const dateNow = new Date().toLocaleString("en-US", { month: "long" });
      const month = dateNow;
      const hash = withdrawMaxEmployee;
      const type = "withdrawMax";
      const streamIdString = streamId.toString();
      const salaryUsersBa = formatted?.toString() || "0";

      const createDatabase = await createAllowcationAirdrop(
        employee.id_employe,
        salaryUsersBa,
        month,
        type,
        hash,
        streamIdString
      );

      console.log("DB saved:", createDatabase);

      setIsError(false);
      setIsSuccess(true);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to claim reward:", err);
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
    userstxHistory,
    setIsModalOpen,
    setStatusWidraw,
    setIsSuccess,
    setIsError,
    setUserstxHistory,
  };
}