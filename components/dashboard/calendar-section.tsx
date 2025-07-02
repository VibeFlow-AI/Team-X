"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
      </CardContent>
    </Card>
  )
}
