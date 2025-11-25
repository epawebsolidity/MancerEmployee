"use client";

import { EmployeUsers } from "@/app/api/Employe";
import type { Employee } from "@/types/Employe";
import { useEffect, useState } from "react";
import { getBalanceHistoryEmploye } from "../api/Salary";


export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  //const [employesJoin, setEmployeJoin] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [salaryUsersLog, setSalaryUsersLog] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await EmployeUsers();
        setEmployees(res?.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(()=> {
   const historyBalanceLog = async () => {
      try {
        const res = await getBalanceHistoryEmploye();
        setSalaryUsersLog(res?.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

        historyBalanceLog();
    },[]);

  //   useEffect(()=> {
  //  const joinEmployeStemaId = async () => {
  //     try {
  //       const res = await EmployeJoinSalary();
  //       setEmployeJoin(res?.data || []);
  //     } catch (err) {
  //       console.error("Error fetching employees:", err);
  //       setError("Failed to fetch employee data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //       joinEmployeStemaId();
  //   },[]);

  return { salaryUsersLog, employees, loading, error };
};



// export const useEmployee = (id: string | number) => {
//   const [employee, setEmployee] = useState<Employee | null>(null);
//   const [salary, setSalary] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const { address, isConnected } = useAccount();
//   const { connect } = useConnect({ connector: injected() });
//   const { writeContractAsync } = useWriteContract();
//   //const [streamId, setStreamId] = useState<number | null>(null);
//   const token = process.env.NEXT_PUBLIC_PHII_CONTRACT_ADDRESS as `0x${string}`;
//   const streamContract = process.env
//     .NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS as `0x${string}`;

//   const publicClient = createPublicClient({
//     chain: eduChainTestnet,
//     transport: http(eduChainTestnet.rpcUrls.default.http[0]),
//   });

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       setLoading(true);
//       try {
//         const res = await EmployeUsers();
//         const emp = res.data.find((e: Employee) => e.id_employe === Number(id));
//         setEmployee(emp || null);
//       } catch (err) {
//         console.error("Failed to fetch employee:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   const handleSendReward = async () => {
//     if (!address) {
//       await connect();
//       return;
//     }

//     if (!salary || !employee) return;

//     try {
//       const res = await getWalletByUserId(Number(employee.id_users));
//       if (!res?.address_wallet) {
//         console.log("Wallet employee belum tersedia!");
//         return;
//       }
//       const recipient: `0x${string}` = res.address_wallet;
//       const amount = parseUnits(salary || "0", 18); // misal salary="10" → 10*10^18
//       const duration = BigInt(30 * 24 * 60 * 60); // 30 hari dalam detik
//       const ratePerSecond = amount / duration;

//       console.log("amount:", amount.toString());
//       console.log("ratePerSecond:", ratePerSecond.toString());

//       console.log(amount);

//       const allowance = await publicClient.readContract({
//         address: token,
//         abi: erc20Abi,
//         functionName: "allowance",
//         args: [address, streamContract],
//       });

//       if (allowance < amount) {
//         console.log("Allowance kurang, perlu approve dulu...");
//         await writeContractAsync({
//           account: address,
//           address: token,
//           abi: erc20Abi,
//           functionName: "approve",
//           args: [streamContract, amount],
//         });

//         console.log("Approve selesai");
//       } else {
//         console.log("Allowance cukup, tidak perlu approve");
//       }

//       const createTx = await writeContractAsync({
//         account: address,
//         address: streamContract,
//         abi: abiTokenPhii,
//         functionName: "createAndDeposit",
//         args: [address, recipient, ratePerSecond, token, true, amount],
//       });

//       const receipt = await waitForTransactionReceipt(publicClient, {
//         hash: createTx,
//       });

//      let streamId: bigint | null = null;

//       for (const log of receipt.logs) {
//         try {
//           const decoded = decodeEventLog({
//             abi: abiTokenPhii,
//             data: log.data,
//             topics: log.topics,
//           });

//           if (decoded.eventName === "DepositFlowStream") {
//             streamId = decoded.args.streamId as bigint;
//             break;
//           }
//         } catch (err) {
//           console.error("Error decoding event log:", err);
//         }
//       }

//       if (!streamId) {
//         throw new Error("streamId tidak ditemukan dari event log");
//       }

//       console.log("streamId:", streamId?.toString());
//       const month = "November";
//       const hash = createTx;
//       const streamIdFromTx = streamId;
//       const streamIdString = streamIdFromTx?.toString();
//       const createDatabase = createAllowcationAirdrop(
//         employee.id_users,
//         salary,
//         month, 
//         hash, 
//         streamIdString
//       );
//       console.log(createDatabase, "simpan ke database");
//       setIsSuccess(true);
//       setIsError(true);
//       console.log("Reward sent successfully!");
//     } catch (err) {
//       setIsSuccess(false);
//       setIsError(true);
//       console.error("Failed to send reward:", err);
//     }
//     setIsModalOpen(true);
//   };
//   return {
//     employee,
//     salary,
//     isSuccess,
//     isModalOpen,
//     isError,
//     setSalary,
//     loading,
//     handleSendReward,
//     setIsSuccess,
//     setIsModalOpen,
//     setIsError,
//   };
// };
