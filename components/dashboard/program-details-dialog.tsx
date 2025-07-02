import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Course } from "@/types";

interface ProgramDetailsDialogProps {
	course: Course;
}

export function ProgramDetailsDialog({ course }: ProgramDetailsDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full bg-transparent">
					View Program Details
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>{course.title}</DialogTitle>
					<DialogDescription>
						{course.studentsEnrolled} students enrolled
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold mb-4">Session Requests</h3>
						<div className="space-y-4">
							{(course.sessions ?? [])
								.sort(
									(a, b) =>
										new Date(a.date).getTime() - new Date(b.date).getTime()
								)
								.map((session) => (
									<Card key={session.id}>
										<CardContent className="p-4">
											<div className="flex justify-between items-start">
												<div className="space-y-2">
													<div className="flex items-center space-x-2">
														<Avatar className="w-8 h-8">
															<AvatarFallback>
																{session.student.name.charAt(0)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">
																{session.student.name}
															</p>
															<p className="text-sm text-muted-foreground">
																{session.student.email}
															</p>
														</div>
													</div>
													<div className="flex items-center space-x-4 text-sm text-muted-foreground">
														<span>{session.date}</span>
														<span>{session.time}</span>
														<Badge
															variant={
																session.status === "confirmed"
																	? "default"
																	: "secondary"
															}
														>
															{session.status}
														</Badge>
													</div>
												</div>
												<div className="flex space-x-2">
													<Button size="sm" variant="outline">
														Reschedule
													</Button>
													<Button size="sm">Confirm</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
