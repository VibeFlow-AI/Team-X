"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Clock, AlertTriangle } from "lucide-react"
import type { Mentor } from "@/data/mentor"
import { bookingManager, type TimeSlot } from "@/lib/booking-system"

interface BookingDialogProps {
  mentor: Mentor | null
  open: boolean
  onClose: () => void
  onBookingComplete: (booking: any) => void
}

export function BookingDialog({ mentor, open, onClose, onBookingComplete }: BookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (mentor && selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0]
      const slots = bookingManager.getAvailableSlots(mentor, dateString, "PST")
      setAvailableSlots(slots)
      setSelectedTime(undefined)
    }
  }, [mentor, selectedDate])

  const handleBooking = async () => {
    if (!mentor || !selectedDate || !selectedTime) return

    setLoading(true)
    setError(undefined)

    try {
      const result = await bookingManager.createBooking(
        mentor.id,
        "student_123", // Mock student ID
        {
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          duration: 60,
        },
      )

      if (result.success && result.booking) {
        onBookingComplete(result.booking)
        onClose()
      } else {
        setError(result.error || "Failed to create booking")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!mentor) return null

  const today = new Date()
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 30) // 30 days from now

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Session with {mentor.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < today || date > maxDate}
              className="rounded-md border"
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Available Times</h3>
            {selectedDate ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableSlots.length === 0 ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      No available slots for this date. Try selecting a different date.
                    </AlertDescription>
                  </Alert>
                ) : (
                  availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="w-full justify-between"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <span>{slot.time}</span>
                      {!slot.available && slot.reason && (
                        <Badge variant="secondary" className="text-xs">
                          {slot.reason}
                        </Badge>
                      )}
                    </Button>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <p>Select a date to see available times</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedDate && selectedTime && (
              <>
                Session: {selectedDate.toDateString()} at {selectedTime} ({mentor.timezone})
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime || loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Book Session (${mentor.hourlyRate})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
