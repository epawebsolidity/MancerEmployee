"use client";

import { useEmployees } from "@/app/hooks/useEmployees";
import Card from "@/components/Card/Card";
import { useRouter } from "next/navigation";

const EmployePage = () => {
  const router = useRouter();
  const { employees, loading } = useEmployees();

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading data...</p>;
  }

  const handleSendReward = (id_employe: string | number) => {
    router.push(`/features/admin/employe/deposite/${id_employe}`);
  };

  const handleOnRefund = (id_employe: string | number) => {
    router.push(`/features/admin/employe/refund/${id_employe}`);
  }

  return (
    <div className="min-h-screen font-sans text-black px-6 md:px-16 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          Mancer All Data Employe
        </h1>
      </div>

      <div className="mt-12 grid gap-4 max-w-3xl mx-auto">
        {employees.map((emp, index) => (
          <Card
            key={emp.id_employe || index}
            employee={emp}
            onSendReward={handleSendReward}
            onRefund={handleOnRefund}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployePage;
