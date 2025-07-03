"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MentorDiscovery } from "./component/students/mentor-discovery";
import { StudentSessions } from "./component/students/student-sessions";
import { UserSearch, CalendarIcon } from "lucide-react";
import type { NavigationItem } from "@/components/dashboard/sidebar";

const navigationItems: NavigationItem[] = [
	{
		id: "discovery",
		label: "Find Mentors",
		icon: UserSearch,
	},
	{
		id: "sessions",
		label: "My Sessions",
		icon: CalendarIcon,
	},
];

export default function StudentDashboard() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [activeView, setActiveView] =
		useState<NavigationItem["id"]>("discovery");

	const renderActiveView = () => {
		switch (activeView) {
			case "discovery":
				return <MentorDiscovery />;
			case "sessions":
				return <StudentSessions />;
			default:
				return <MentorDiscovery />;
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
