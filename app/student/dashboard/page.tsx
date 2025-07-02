"use client"

import { useState } from "react"
import { MentorDiscovery } from "./component/students/mentor-discovery"
import { StudentSessions } from "./component/students/student-sessions"

type StudentView = "discovery" | "sessions" | "profile"

export default function StudentDashboard() {
  const [activeView, setActiveView] = useState<StudentView>("discovery")

  const renderActiveView = () => {
    switch (activeView) {
      case "discovery":
        return <MentorDiscovery />
      case "sessions":
        return <StudentSessions />
      case "profile":
        return <div>Profile view coming soon...</div>
      default:
        return <MentorDiscovery />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveView("discovery")}
              className={`pb-2 border-b-2 transition-colors ${
                activeView === "discovery"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Find Mentors
            </button>
            <button
              onClick={() => setActiveView("sessions")}
              className={`pb-2 border-b-2 transition-colors ${
                activeView === "sessions"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              My Sessions
            </button>
            <button
              onClick={() => setActiveView("profile")}
              className={`pb-2 border-b-2 transition-colors ${
                activeView === "profile"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile
            </button>
          </nav>
        </div>
        {renderActiveView()}
      </main>
    </div>
  )
}

