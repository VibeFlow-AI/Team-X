"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const todaysSessions = [
  {
    id: 1,
    student: { name: "Sarah Johnson", avatar: "S", email: "sarah.j@email.com" },
    time: "10:00 AM",
    program: "Web Development Bootcamp",
    status: "upcoming",
  },
  {
    id: 2,
    student: { name: "Alex Chen", avatar: "A", email: "alex.chen@email.com" },
    time: "2:00 PM",
    program: "Data Science Fundamentals",
    status: "upcoming",
  },
  {
    id: 3,
    student: { name: "Victoria Smith", avatar: "V", email: "v.smith@email.com" },
    time: "4:00 PM",
    program: "Mobile App Development",
    status: "upcoming",
  },
]

export function TodaysBookings() {
  const handleStartSession = (sessionId: number) => {
    console.log("Starting session:", sessionId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Today's Bookings"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todaysSessions.map((session) => (
          <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>{session.student.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{session.student.name}</p>
                <p className="text-sm text-muted-foreground">{session.time}</p>
                <p className="text-xs text-muted-foreground">{session.program}</p>
              </div>
            </div>
            <Button size="sm" onClick={() => handleStartSession(session.id)}>
              Start Session
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
