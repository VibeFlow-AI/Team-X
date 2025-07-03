"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavigationItem } from "@/app/mentor/dashboard/page";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

interface SidebarProps {
	isCollapsed: boolean;
	setIsCollapsed: (isCollapsed: boolean) => void;
	activeView: NavigationItem["id"];
	onNavigate: (view: NavigationItem) => void;
	navigationItems: NavigationItem[];
}

export function Sidebar({
	isCollapsed,
	setIsCollapsed,
	activeView,
	onNavigate,
	navigationItems,
}: SidebarProps) {
	const { user } = useUser();

	return (
		<aside
			className={cn(
				"fixed flex flex-col inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
				isCollapsed ? "w-16" : "w-64"
			)}
		>
			{/* Header with collapse toggle */}
			<div
				className={cn(
					"flex h-16 items-center justify-between px-6 border-b border-border",
					isCollapsed && "px-4"
				)}
			>
				{!isCollapsed && (
					<h1 className="text-xl font-bold text-foreground">
						{user?.publicMetadata.role === "mentor"
							? "Mentor Dashboard"
							: user?.publicMetadata.role === "student"
							? "Student Dashboard"
							: "Dashboard"}
					</h1>
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

			{/* Navigation Items */}
			<nav className="mt-6 px-3">
				<ul className="space-y-1">
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
				</ul>
			</nav>

			{/* User Profile */}
			<div
				className={cn(
					"p-4 border-t border-gray-200 mt-auto",
					isCollapsed && "px-2"
				)}
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
