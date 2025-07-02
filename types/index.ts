export interface Course {
	id: string;
	initials: string;
	title: string;
	author: string;
	tags: string[];
	description: string;
	features: string[];
	duration: string;
	idealFor: string;
	studentsEnrolled?: number;
	sessions?: Session[];
}

export interface Feature {
	title: string;
	img: string;
}

export interface Student {
	name: string;
	email: string;
	phone: string;
	location: string;
	age: number;
	interests: string[];
}

export interface Session {
	id: string;
	date: string;
	time: string;
	status: "confirmed" | "pending" | "cancelled";
	student: Student;
}
