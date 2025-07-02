import { StatsCards } from "@/components/dashboard/stats-cards";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { CalendarSection } from "@/components/dashboard/calendar-section";
import { TodaysBookings } from "@/components/dashboard/todays-bookings";

export function Overview() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
				<p className="text-gray-600">
					Welcome back, Dr. Patel. Here&apos;s your mentoring summary.
				</p>
			</div>

			<StatsCards />
			<ChartsSection />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<CalendarSection />
				<TodaysBookings />
			</div>
		</div>
	);
}
