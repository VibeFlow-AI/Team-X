import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { SessionDetailsDialog } from "@/components/dashboard/session-details-dialog";
import { courseData } from "@/data/courses";

export function SessionsManager() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">All Sessions</h1>
					<p className="text-gray-600">
						Manage and view all your mentoring sessions
					</p>
				</div>
				<div className="flex space-x-2">
					<Button variant="outline" size="sm">
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
					<Button variant="outline" size="sm">
						Today
					</Button>
				</div>
			</div>

			<div className="space-y-4">
				{courseData.flatMap((course) =>
					course.sessions?.map((session) => (
						<Card key={session.id}>
							<CardContent className="flex items-center justify-between p-6">
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarFallback>
											{session.student.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="font-medium">{session.student.name}</h3>
										<p className="text-sm text-muted-foreground">
											{course.title}
										</p>
										<p className="text-sm text-muted-foreground">
											{session.date} at {session.time}
										</p>
										<Badge
											variant={
												session.status === "confirmed" ? "default" : "secondary"
											}
											className="mt-1"
										>
											{session.status}
										</Badge>
									</div>
								</div>
								<SessionDetailsDialog session={session} course={course} />
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
