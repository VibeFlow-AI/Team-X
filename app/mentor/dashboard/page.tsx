"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Overview } from "@/components/dashboard/overview";
import { SessionsManager } from "@/components/dashboard/sessions-manager";
import { CreateSession } from "@/components/dashboard/create-session";
import { ProgramsManager } from "@/components/dashboard/programs-manager";

export type NavigationItem = "overview" | "sessions" | "create" | "programs";

export default function MentorDashboard() {
	const [activeView, setActiveView] = useState<NavigationItem>("overview");

	const renderActiveView = () => {
		switch (activeView) {
			case "overview":
				return <Overview />;
			case "sessions":
				return <SessionsManager />;
			case "create":
				return <CreateSession />;
			case "programs":
				return <ProgramsManager />;
			default:
				return <Overview />;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex">
				<Sidebar activeView={activeView} onNavigate={setActiveView} />
				<main className="flex-1 p-6">{renderActiveView()}</main>
			</div>
		</div>
	);
}
