"use client";

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

export function useUserHome() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salary, setSalary] = useState<SalaryAllocation[]>([]);
  const [loading, setLoading] = useState(true);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { writeContract, isPending } = useWriteContract();

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

  const employee = employees[0];
  const salaryValue = salary.length > 0 ? Number(salary[0]?.salary) : 0;

  const decimals = 18;
  const amount = parseUnits(String(salaryValue), decimals);

  const handleClaim = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    try {
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

  return {
    employee,
    salaryValue,
    loading,
    handleClaim,
    isPending,
  };
}
