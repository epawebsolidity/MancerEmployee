"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Footer from "@/components/Footer/Footer";
import NavbarClient from "@/components/Navbar/NavbarClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navItems, setNavItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (token) {
      try {
        const userData: any = jwtDecode(token);
        const userRole = userData?.role;

        if (userRole === "Admin") {
          setNavItems([
            { to: "/features/admin/home", label: "Home" },
            { to: "/features/admin/employe", label: "Employee" },
          ]);
        } else {
          setNavItems([
            { to: "/features/users/home", label: "Home" },
            { to: "/features/users/refund", label: "Refund" },
          ]);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarClient navItems={navItems} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
