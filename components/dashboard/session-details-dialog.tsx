import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { User, Mail, Phone, MapPin, Clock, GraduationCap } from "lucide-react";

import { Session, Course } from "@/types";

interface SessionDetailsDialogProps {
	session: Session;
	course: Course;
}

export function SessionDetailsDialog({
	session,
	course,
}: SessionDetailsDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">View Session Details</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Session Details</DialogTitle>
					<DialogDescription>
						Session with {session.student.name} - {course.title}
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<User className="h-4 w-4" />
							<span>{session.student.name}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail className="h-4 w-4" />
							<span>{session.student.email}</span>
						</div>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4" />
							<span>{session.student.phone}</span>
						</div>
						<div className="flex items-center space-x-2">
							<MapPin className="h-4 w-4" />
							<span>{session.student.location}</span>
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Clock className="h-4 w-4" />
							<span>
								{session.date} at {session.time}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<GraduationCap className="h-4 w-4" />
							<span>Age: {session.student.age}</span>
						</div>
						<div>
							<p className="font-medium mb-2">Interests:</p>
							<div className="flex flex-wrap gap-2">
								{session.student.interests.map(
									(interest: string, idx: number) => (
										<Badge key={idx} variant="secondary">
											{interest}
										</Badge>
									)
								)}
							</div>
						</div>
						<Badge
							variant={session.status === "confirmed" ? "default" : "secondary"}
						>
							{session.status}
						</Badge>
					</div>
				</div>
				<div className="mt-4 border-t pt-4">
					<h3 className="font-medium mb-2">Course Information</h3>
					<p className="font-bold">{course.title}</p>
					{course.description && (
						<p className="text-sm text-gray-600 mt-1">{course.description}</p>
					)}
					{course.duration && (
						<p className="text-sm mt-1">Duration: {course.duration}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
