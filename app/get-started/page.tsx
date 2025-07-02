"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserType = "student" | "mentor" | null;

export default function GetStartedPage() {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const router = useRouter();

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleContinue = () => {
    if (selectedUserType) {
      // TODO: Implement actual routing or user type registration logic
      console.log(`Selected user type: ${selectedUserType}`);
      router.push(`/get-started/${selectedUserType}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to EduVibe</h1>
        <p className="text-gray-600 mb-8">Choose your role to get started</p>

        <div className="flex justify-center gap-6 mb-8">
          <div
            onClick={() => handleUserTypeSelect("student")}
            className={`
              cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 
              ${selectedUserType === "student" ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-200 hover:border-blue-300"}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`
                w-16 h-16 mx-auto mb-4
                ${selectedUserType === "student" ? "text-blue-500" : "text-gray-400"}
              `}
              fill="currentColor"
            >
              <path d="M12 2L1 9l4 2.8V19h14v-7.2L23 9l-4-2.8V5h-3v1.3L12 2zm0 4.5L16 8l-4 2.5L8 8l4-1.5zM5 12.7l7 4.3 7-4.3V19H5v-6.3z" />
            </svg>
            <h2
              className={`
              text-xl font-semibold
              ${selectedUserType === "student" ? "text-blue-600" : "text-gray-700"}
            `}
            >
              Student
            </h2>
          </div>

          <div
            onClick={() => handleUserTypeSelect("mentor")}
            className={`
              cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 
              ${
                selectedUserType === "mentor"
                  ? "border-green-500 bg-green-50 scale-105"
                  : "border-gray-200 hover:border-green-300"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`
                w-16 h-16 mx-auto mb-4
                ${selectedUserType === "mentor" ? "text-green-500" : "text-gray-400"}
              `}
              fill="currentColor"
            >
              <path d="M17 12h-5v5h5v-5zm-1.5 9c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zM22 12v3h-2v-3h2zm-6.5 6c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h-6v-2zm6-9.5c0 .275-.225.5-.5.5h-2c-.275 0-.5-.225-.5-.5v-2c0-.275.225-.5.5-.5h2c.275 0 .5.225.5.5v2zM12 3l1.5 1.5L12 6l-1.5-1.5L12 3zm9 12v3h-2v-3h2zm-6 0h2v3h-2v-3zM9 12H4v-2l5-3 5 3v2H9zm-4 3h2v3H5v-3zm0-3h2v2H5v-2z" />
            </svg>
            <h2
              className={`
              text-xl font-semibold
              ${selectedUserType === "mentor" ? "text-green-600" : "text-gray-700"}
            `}
            >
              Mentor
            </h2>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedUserType}
          className={`
            w-full py-3 text-lg transition-all duration-300
            ${selectedUserType ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
