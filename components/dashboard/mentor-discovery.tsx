"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Filter, AlertCircle } from "lucide-react"
import { mentors } from "@/data/mentor"
import { findMatchingMentors, type StudentProfile, type MatchResult } from "@/lib/matching-algorithm"
import { bookingManager } from "@/lib/booking-system"
import { MentorCard } from "./mentor-card"
import { BookingDialog } from "./booking-dialog"

export function MentorDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    skills: ["React", "JavaScript"],
    goals: ["Web Development", "Frontend"],
    experience: "intermediate",
    budget: 150,
    timezone: "PST",
    preferredLanguages: ["English"],
  })
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const results = findMatchingMentors(mentors, studentProfile)
    setMatches(results)
  }, [studentProfile])

  const handleSkillAdd = (skill: string) => {
    if (skill && !studentProfile.skills.includes(skill)) {
      setStudentProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const handleSkillRemove = (skill: string) => {
    setStudentProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleGoalAdd = (goal: string) => {
    if (goal && !studentProfile.goals.includes(goal)) {
      setStudentProfile((prev) => ({
        ...prev,
        goals: [...prev.goals, goal],
      }))
    }
  }

  const handleGoalRemove = (goal: string) => {
    setStudentProfile((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g !== goal),
    }))
  }

  const handleBookSession = (mentorId: string) => {
    const mentor = mentors.find((m) => m.id === mentorId)
    setSelectedMentor(mentor)
    setShowBookingDialog(true)
  }

  const handleBookingComplete = (booking: any) => {
    // Handle successful booking
    console.log("Booking completed:", booking)
  }

  const filteredMatches = matches.filter(
    (match) =>
      match.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.mentor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      match.mentor.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const noSuitableMentors = matches.length === 0
  const noMatchesMessage = bookingManager.handleNoSuitableMentors(studentProfile)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
        <p className="text-gray-600">Discover mentors matched to your skills, goals, and preferences</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search mentors, skills, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customize Your Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Skills</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {studentProfile.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="default"
                        className="cursor-pointer"
                        onClick={() => handleSkillRemove(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSkillAdd(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Goals</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {studentProfile.goals.map((goal) => (
                      <Badge
                        key={goal}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleGoalRemove(goal)}
                      >
                        {goal} ×
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add a goal and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleGoalAdd(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select
                    value={studentProfile.experience}
                    onValueChange={(value: any) => setStudentProfile((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Timezone</label>
                  <Select
                    value={studentProfile.timezone}
                    onValueChange={(value) => setStudentProfile((prev) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST">Pacific (PST)</SelectItem>
                      <SelectItem value="EST">Eastern (EST)</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                      <SelectItem value="CET">Central European (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Budget: ${studentProfile.budget}/hour</label>
                <Slider
                  value={[studentProfile.budget]}
                  onValueChange={([value]) => setStudentProfile((prev) => ({ ...prev, budget: value }))}
                  max={200}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results */}
      {noSuitableMentors ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{noMatchesMessage}</AlertDescription>
        </Alert>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{filteredMatches.length} mentors found</h2>
            <div className="text-sm text-muted-foreground">Sorted by match score</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match) => (
              <MentorCard
                key={match.mentor.id}
                matchResult={match}
                onBookSession={handleBookSession}
                onViewProfile={(id) => console.log("View profile:", id)}
              />
            ))}
          </div>
        </div>
      )}

      <BookingDialog
        mentor={selectedMentor}
        open={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  )
}
