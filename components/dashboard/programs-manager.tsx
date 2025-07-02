import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProgramDetailsDialog } from "@/components/dashboard/program-details-dialog";
import { courseData } from "@/data/courses";

export function ProgramsManager() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">My Programs</h1>
					<p className="text-gray-600">
						Manage your mentoring programs and track student progress
					</p>
				</div>
				<Button>
					<Plus className="h-4 w-4 mr-2" />
					Add Program
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courseData.map((course) => (
					<Card
						key={course.id}
						className="cursor-pointer hover:shadow-lg transition-shadow"
					>
						<CardHeader>
							<CardTitle className="text-lg">{course.title}</CardTitle>
							<CardDescription>
								{course.studentsEnrolled} students enrolled
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">
									{course.sessions?.length || 0} session requests
								</p>
								<ProgramDetailsDialog course={course} />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
