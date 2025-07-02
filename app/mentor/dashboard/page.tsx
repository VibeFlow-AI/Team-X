"use client";

import { useState } from "react";
import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Overview } from "@/components/dashboard/overview";
import { SessionsManager } from "@/components/dashboard/sessions-manager";
import { CreateSession } from "@/components/dashboard/create-session";
import { ProgramsManager } from "@/components/dashboard/programs-manager";
import { Home, CalendarIcon, Plus, BookOpen } from "lucide-react";

export type NavigationItem = {
	id: "overview" | "sessions" | "create" | "programs";
	label: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

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
				/>
				<main className="flex-1 p-6 ml-64">{renderActiveView()}</main>
			</div>
		</div>
	);
}
