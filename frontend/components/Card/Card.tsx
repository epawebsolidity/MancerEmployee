import type { CardEmployeProps } from "@/types/CardEmployeProps";
import { ArrowRightLeft, SendHorizonal } from "lucide-react";

const CardEmploye = ({ employee, onSendReward, onRefund }: CardEmployeProps) => {
  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition group">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition">
          {employee.name}
        </h3>

        <span className="text-[10px] px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
          {employee.position}
        </span>
      </div>

      {/* Details */}
      <div className="mt-2 space-y-1">
        <p className="text-xs text-gray-500">
          Joined: <span className="font-medium text-gray-700">{employee.date_of_birth}</span>
        </p>

        <p className="text-xs text-gray-500">
          Employee ID: <span className="font-medium text-gray-700">{employee.id_employe}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4">
        {/* Send Salary */}
        <button
          onClick={() => onSendReward && onSendReward(employee.id_employe)}
          className="flex items-center gap-1 bg-blue-600 w-full justify-center px-3 py-2 text-xs text-white rounded-full hover:bg-blue-700 font-semibold shadow-sm transition"
        >
          <SendHorizonal size={14} /> Send Salary
        </button>

        {/* Refund */}
        <button
          onClick={() => onRefund && onRefund(employee.id_employe)}
          className="flex items-center gap-1 bg-red-600 w-full justify-center px-3 py-2 text-xs text-white rounded-full hover:bg-red-700 font-semibold shadow-sm transition"
        >
          <ArrowRightLeft size={14} /> Refund
        </button>
      </div>
    </div>
  );
};

export default CardEmploye;
