"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MessageSquare } from "lucide-react"
import { bookingManager } from "@/lib/booking-system"
import { mentors } from "@/data/mentor"

export function StudentSessions() {
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    // Mock student ID
    const studentBookings = bookingManager.getStudentBookings("student_123")
    setBookings(studentBookings)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const handleJoinSession = (booking: any) => {
    if (booking.meetingLink) {
      window.open(booking.meetingLink, "_blank")
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    const success = bookingManager.cancelBooking(bookingId)
    if (success) {
      setBookings((prev) =>
        prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)),
      )
    }
  }

  const upcomingSessions = bookings.filter(
    (booking) => new Date(`${booking.slot.date} ${booking.slot.time}`) > new Date() && booking.status !== "cancelled",
  )

  const pastSessions = bookings.filter(
    (booking) => new Date(`${booking.slot.date} ${booking.slot.time}`) <= new Date() || booking.status === "completed",
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
        <p className="text-gray-600">Manage your upcoming and past mentoring sessions</p>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
        {upcomingSessions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No upcoming sessions</p>
              <Button className="mt-4">Find a Mentor</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((booking) => {
              const mentor = mentors.find((m) => m.id === booking.mentorId)
              if (!mentor) return null

              return (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{mentor.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentor.title}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.slot.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.slot.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                        {booking.status === "confirmed" && (
                          <Button size="sm" onClick={() => handleJoinSession(booking)}>
                            <Video className="w-4 h-4 mr-2" />
                            Join Session
                          </Button>
                        )}
                        {booking.status === "pending" && (
                          <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Past Sessions */}
      {pastSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
          <div className="space-y-4">
            {pastSessions.map((booking) => {
              const mentor = mentors.find((m) => m.id === booking.mentorId)
              if (!mentor) return null

              return (
                <Card key={booking.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{mentor.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentor.title}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.slot.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.slot.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Leave Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
