"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavigationItem } from "@/app/mentor/dashboard/page";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

interface SidebarProps {
	activeView: NavigationItem["id"];
	onNavigate: (view: NavigationItem) => void;
	navigationItems: NavigationItem[];
}

export function Sidebar({
	activeView,
	onNavigate,
	navigationItems,
}: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const { user } = useUser();

	return (
		<aside
			className={cn(
				"fixed bg-white border-r border-gray-200 flex flex-col transition-all max-h-screen duration-300 ease-in-out",
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
							onClick={() => onNavigate(item)}
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
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				) : (
					<div className="flex items-center space-x-3">
						<SignedIn>
							<UserButton />
							<div>
								<p className="text-sm font-medium">{user?.fullName ?? ""}</p>
								<p className="text-xs text-gray-500">
									{user?.publicMetadata.role === "mentor"
										? "Mentor"
										: user?.publicMetadata.role === "student"
										? "Student"
										: ""}
								</p>
							</div>
						</SignedIn>
					</div>
				)}
			</div>
		</aside>
	);
}
