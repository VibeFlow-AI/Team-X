"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Home,
	CalendarIcon,
	Plus,
	BookOpen,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import type { NavigationItem } from "@/app/mentor/dashboard/page";
import { cn } from "@/lib/utils";

interface SidebarProps {
	activeView: NavigationItem;
	onNavigate: (view: NavigationItem) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const navigationItems = [
		{
			id: "overview" as NavigationItem,
			label: "Overview",
			icon: Home,
		},
		{
			id: "sessions" as NavigationItem,
			label: "All Sessions",
			icon: CalendarIcon,
		},
		{
			id: "create" as NavigationItem,
			label: "Create Session",
			icon: Plus,
		},
		{
			id: "programs" as NavigationItem,
			label: "Programs",
			icon: BookOpen,
		},
	];

	return (
		<aside
			className={cn(
				"bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
				isCollapsed ? "w-16" : "w-64"
			)}
		>
			{/* Header with collapse toggle */}
			<div
				className={cn("p-4 border-b border-gray-200", isCollapsed && "px-2")}
			>
				<div className="flex items-center justify-between">
					{!isCollapsed && (
						<h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
					)}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="h-8 w-8"
					>
						{isCollapsed ? (
							<ChevronRight className="h-4 w-4" />
						) : (
							<ChevronLeft className="h-4 w-4" />
						)}
					</Button>
				</div>
			</div>

			{/* Navigation Items */}
			<nav
				className={cn(
					"flex-1 space-y-2",
					isCollapsed ? "px-2 py-4" : "px-4 py-4"
				)}
			>
				{navigationItems.map((item) => {
					const Icon = item.icon;
					return (
						<Button
							key={item.id}
							variant="ghost"
							className={cn(
								"w-full transition-all duration-200",
								isCollapsed
									? "h-10 w-10 p-0 justify-center"
									: "justify-start text-left",
								activeView === item.id && "bg-gray-100 text-gray-900"
							)}
							onClick={() => onNavigate(item.id)}
							title={isCollapsed ? item.label : undefined}
						>
							<Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
							{!isCollapsed && <span>{item.label}</span>}
						</Button>
					);
				})}
			</nav>

			{/* User Profile */}
			<div
				className={cn("p-4 border-t border-gray-200", isCollapsed && "px-2")}
			>
				{isCollapsed ? (
					<div className="flex justify-center">
						<Avatar className="w-10 h-10">
							<AvatarImage src="/placeholder.svg?height=40&width=40" />
							<AvatarFallback>DP</AvatarFallback>
						</Avatar>
					</div>
				) : (
					<div className="flex items-center space-x-3">
						<Avatar className="w-10 h-10">
							<AvatarImage src="/placeholder.svg?height=40&width=40" />
							<AvatarFallback>DP</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">Dr. Patel</p>
							<p className="text-xs text-gray-500">Mentor</p>
						</div>
					</div>
				)}
			</div>
		</aside>
	);
}
