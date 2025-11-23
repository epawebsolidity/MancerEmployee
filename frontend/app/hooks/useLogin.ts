"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthWallet } from "@/app/api/AuthWallet";

export function useLogin() {
  const router = useRouter();
  const { loginWithClearWallet } = useAuthWallet();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
     
      const { user, error: loginError } = await loginWithClearWallet(
        email,
        password
      );

      setLoading(false); 

      if (loginError) {
        setError(loginError);
        return;
      }

      
      if (user?.role === "Admin") {
        router.push("/features/admin/home");
      } else if (user?.role === "Users") {
        router.push("/features/users/home");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Error login:", err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
}
