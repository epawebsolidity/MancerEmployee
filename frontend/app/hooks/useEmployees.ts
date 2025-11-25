"use client";

import { EmployeUsers } from "@/app/api/Employe";
import type { Employee } from "@/types/Employe";
import { useEffect, useState } from "react";
import { getBalanceHistoryEmploye } from "../api/Salary";


export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
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
  return { salaryUsersLog, employees, loading, error };
};