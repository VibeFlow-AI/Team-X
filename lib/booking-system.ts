import type { Mentor } from "@/data/mentor"

export interface BookingSlot {
  date: string
  time: string
  duration: number // in minutes
}

export interface Booking {
  id: string
  mentorId: string
  studentId: string
  slot: BookingSlot
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: Date
  meetingLink?: string
}

export interface TimeSlot {
  time: string
  available: boolean
  reason?: string
}

class BookingManager {
  private bookings: Map<string, Booking> = new Map()
  private lastUpdate: Map<string, number> = new Map()

  // Simulate real-time state management
  private getStateVersion(mentorId: string): number {
    return this.lastUpdate.get(mentorId) || Date.now()
  }

  private updateStateVersion(mentorId: string): void {
    this.lastUpdate.set(mentorId, Date.now())
  }

  // Get available time slots for a mentor on a specific date
  getAvailableSlots(mentor: Mentor, date: string, studentTimezone = "UTC"): TimeSlot[] {
    const dayOfWeek =
    new Date(date).toLocaleDateString().toLowerCase().slice(0, 3) +
    new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase().slice(3)

    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const mentorSlots = mentor.availability[dayName] || []

    // Check for conflicts with existing bookings
    const existingBookings = Array.from(this.bookings.values()).filter(
      (booking) => booking.mentorId === mentor.id && booking.slot.date === date && booking.status !== "cancelled",
    )

    return mentorSlots.map((time) => {
      const isBooked = existingBookings.some((booking) => booking.slot.time === time)
      const isInPast = new Date(`${date} ${time}`) < new Date()

      let available = !isBooked && !isInPast
      let reason: string | undefined

      if (isInPast) {
        reason = "Time slot has passed"
        available = false
      } else if (isBooked) {
        reason = "Already booked"
        available = false
      }

      // Timezone considerations
      if (available && mentor.timezone !== studentTimezone) {
        reason = `Mentor timezone: ${mentor.timezone}`
      }

      return {
        time,
        available,
        reason,
      }
    })
  }

  // Create a booking with conflict checking
  async createBooking(
    mentorId: string,
    studentId: string,
    slot: BookingSlot,
    stateVersion?: number,
  ): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    // Check for stale state
    const currentVersion = this.getStateVersion(mentorId)
    if (stateVersion && stateVersion < currentVersion - 30000) {
      // 30 seconds tolerance
      return {
        success: false,
        error: "Booking information is outdated. Please refresh and try again.",
      }
    }

    // Check for conflicts
    const conflictingBooking = Array.from(this.bookings.values()).find(
      (booking) =>
        booking.mentorId === mentorId &&
        booking.slot.date === slot.date &&
        booking.slot.time === slot.time &&
        booking.status !== "cancelled",
    )

    if (conflictingBooking) {
      return {
        success: false,
        error: "This time slot has been booked by another student. Please select a different time.",
      }
    }

    // Create booking
    const booking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mentorId,
      studentId,
      slot,
      status: "pending",
      createdAt: new Date(),
      meetingLink: `https://meet.mentorhub.com/${mentorId}_${studentId}_${Date.now()}`,
    }

    this.bookings.set(booking.id, booking)
    this.updateStateVersion(mentorId)

    // Simulate async confirmation process
    setTimeout(() => {
      const currentBooking = this.bookings.get(booking.id)
      if (currentBooking && currentBooking.status === "pending") {
        currentBooking.status = "confirmed"
        this.updateStateVersion(mentorId)
      }
    }, 2000)

    return { success: true, booking }
  }

  // Get bookings for a student
  getStudentBookings(studentId: string): Booking[] {
    return Array.from(this.bookings.values())
      .filter((booking) => booking.studentId === studentId)
      .sort((a, b) => new Date(a.slot.date).getTime() - new Date(b.slot.date).getTime())
  }

  // Cancel a booking
  cancelBooking(bookingId: string): boolean {
    const booking = this.bookings.get(bookingId)
    if (booking && booking.status !== "completed") {
      booking.status = "cancelled"
      this.updateStateVersion(booking.mentorId)
      return true
    }
    return false
  }

  // Handle edge cases
  handleNoSuitableMentors(studentProfile: any): string {
    const suggestions = []

    if (studentProfile.budget < 100) {
      suggestions.push("Consider increasing your budget to access more mentors")
    }

    if (studentProfile.skills.length === 0) {
      suggestions.push("Add some skills to your profile for better matching")
    }

    if (studentProfile.goals.length === 0) {
      suggestions.push("Define your learning goals to find specialized mentors")
    }

    return suggestions.length > 0
      ? `No suitable mentors found. Suggestions: ${suggestions.join(", ")}`
      : "No mentors available for your requirements. Try broadening your search criteria."
  }
}

export const bookingManager = new BookingManager()
