import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const ageGroupData = [
	{ name: "16-18", value: 25, color: "#8884d8" },
	{ name: "19-21", value: 35, color: "#82ca9d" },
	{ name: "22-24", value: 20, color: "#ffc658" },
	{ name: "25+", value: 9, color: "#ff7c7c" },
];

const interestData = [
	{ interest: "Web Development", count: 45 },
	{ interest: "Data Science", count: 32 },
	{ interest: "Mobile Apps", count: 28 },
	{ interest: "AI/ML", count: 25 },
	{ interest: "Cybersecurity", count: 18 },
];

export function ChartsSection() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Student Age Groups</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={ageGroupData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, percent }) =>
									`${name} ${((percent || 0) * 100).toFixed(0)}%`
								}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
							>
								{ageGroupData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Student Interest Areas</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={interestData} layout="horizontal">
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="number" />
							<YAxis dataKey="interest" type="category" width={100} />
							<Tooltip />
							<Bar dataKey="count" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}
