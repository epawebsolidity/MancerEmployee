"use client";

import { useEmployee } from "@/app/hooks/useEmployees";

const EmployeeDetailPage = ({ params }: { params: { id: string } }) => {
  const {
    employee,
    salary,
    setSalary,
    loading,
    handleSendReward,
    isSuccess,
    isModalOpen,
    setIsModalOpen,
    isError,
  } = useEmployee(params.id);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 md:px-16 py-24 font-sans text-gray-800">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Employee Profile
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Detailed information about the selected employee
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {employee.name.charAt(0)}
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-gray-900">
              {employee.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Position:{" "}
              <span className="font-medium text-gray-700">
                {employee.position}
              </span>
            </p>

            <div className="mt-6 w-full border-t border-gray-200 pt-4 text-sm">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Date of Birth:
                </span>{" "}
                {employee.date_of_birth}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendReward();

                if (isSuccess) {
                  setSalary("");
                }
              }}
              className="mt-10 border-t border-gray-200 pt-6 text-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="text"
                  placeholder="send token PHII..."
                  className="w-full sm:w-2/3 px-4 text-xs py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!salary || !employee}
                  className={`bg-red-600 text-xs text-white px-6 py-2 rounded-full font-semibold shadow-md transition
    ${
      !salary || !employee
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-red-700"
    }`}
                >
                  Send
                </button>
              </div>
            </form>

            {isModalOpen && isError && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-xl font-bold text-red-500">Error!</h2>
                  <p className="mt-2 text-gray-700">
                    Failed to send Salary. Please try again.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isModalOpen && isSuccess && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-xl font-bold text-green-500">Success!</h2>
                  <p className="mt-2 text-gray-700">
                    Salary has been successfully sent!
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
