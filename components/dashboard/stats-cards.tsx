import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CalendarIcon, Users } from "lucide-react"

const dashboardStats = {
  totalPrograms: 12,
  totalSessions: 156,
  totalStudents: 89,
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardStats.totalPrograms}</div>
          <p className="text-xs text-muted-foreground">Active programs</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sessions Booked</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardStats.totalSessions}</div>
          <p className="text-xs text-muted-foreground">Total sessions conducted</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students Enrolled</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardStats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">Across all programs</p>
        </CardContent>
      </Card>
    </div>
  )
}
