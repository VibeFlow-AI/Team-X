import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateSession() {
  const handleCreateSession = (formData: FormData) => {
    console.log("Creating session with data:", formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Session</h1>
        <p className="text-gray-600">Set your availability for students to book sessions</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>Fill in the details to create a new mentoring session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={handleCreateSession} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development Bootcamp</SelectItem>
                    <SelectItem value="data-science">Data Science Fundamentals</SelectItem>
                    <SelectItem value="mobile-dev">Mobile App Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Session Description</Label>
              <Textarea id="description" placeholder="Describe what will be covered in this session..." rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-link">Meeting Link (Optional)</Label>
              <Input id="meeting-link" placeholder="https://zoom.us/j/..." />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              Create Session
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
