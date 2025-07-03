"use client";

import { useState } from "react";
import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Overview } from "@/components/dashboard/overview";
import { SessionsManager } from "@/components/dashboard/sessions-manager";
import { CreateSession } from "@/components/dashboard/create-session";
import { ProgramsManager } from "@/components/dashboard/programs-manager";
import { Home, CalendarIcon, Plus, BookOpen } from "lucide-react";
import type { NavigationItem } from "@/components/dashboard/sidebar";

const navigationItems: NavigationItem[] = [
	{
		id: "overview",
		label: "Overview",
		icon: Home,
	},
	{
		id: "sessions",
		label: "All Sessions",
		icon: CalendarIcon,
	},
	{
		id: "create",
		label: "Create Session",
		icon: Plus,
	},
	{
		id: "programs",
		label: "Programs",
		icon: BookOpen,
	},
];

export default function MentorDashboard() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [activeView, setActiveView] =
		useState<NavigationItem["id"]>("overview");

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
				<Sidebar
					activeView={activeView}
					onNavigate={(item) => setActiveView(item.id)}
					navigationItems={navigationItems}
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
				/>
				<main
					className={
						!isCollapsed ? "flex-1 ml-16 lg:ml-64 p-6" : "flex-1 ml-16 p-6"
					}
				>
					{renderActiveView()}
				</main>
			</div>
		</div>
	);
}
