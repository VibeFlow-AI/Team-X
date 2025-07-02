import type { Mentor } from "@/data/mentor"

export interface StudentProfile {
  skills: string[]
  goals: string[]
  experience: "beginner" | "intermediate" | "advanced"
  budget: number
  timezone: string
  preferredLanguages: string[]
}

export interface MatchResult {
  mentor: Mentor
  score: number
  explanation: {
    skillsMatch: number
    goalsMatch: number
    availabilityMatch: number
    budgetMatch: number
    timezoneMatch: number
    languageMatch: number
    breakdown: string[]
  }
}

export function calculateMentorMatch(mentor: Mentor, student: StudentProfile): MatchResult {
  const weights = {
    skills: 0.3,
    goals: 0.25,
    availability: 0.2,
    budget: 0.1,
    timezone: 0.1,
    language: 0.05,
  }

  // Skills matching
  const skillsIntersection = mentor.skills.filter((skill) =>
    student.skills.some(
      (studentSkill) =>
        skill.toLowerCase().includes(studentSkill.toLowerCase()) ||
        studentSkill.toLowerCase().includes(skill.toLowerCase()),
    ),
  )
  const skillsMatch = (skillsIntersection.length / Math.max(student.skills.length, 1)) * 100

  // Goals matching (match goals with mentor specializations)
  const goalsIntersection = mentor.specializations.filter((spec) =>
    student.goals.some(
      (goal) => spec.toLowerCase().includes(goal.toLowerCase()) || goal.toLowerCase().includes(spec.toLowerCase()),
    ),
  )
  const goalsMatch = (goalsIntersection.length / Math.max(student.goals.length, 1)) * 100

  // Availability matching (simplified - check if mentor has any availability)
  const availabilitySlots = Object.values(mentor.availability).flat().length
  const availabilityMatch = Math.min((availabilitySlots / 10) * 100, 100)

  // Budget matching
  const budgetMatch =
    student.budget >= mentor.hourlyRate
      ? 100
      : Math.max(0, 100 - ((mentor.hourlyRate - student.budget) / student.budget) * 100)

  // Timezone matching
  const timezoneMatch = mentor.timezone === student.timezone ? 100 : 50

  // Language matching
  const languageIntersection = mentor.languages.filter((lang) => student.preferredLanguages.includes(lang))
  const languageMatch = languageIntersection.length > 0 ? 100 : 0

  // Calculate weighted score
  const score = Math.round(
    skillsMatch * weights.skills +
      goalsMatch * weights.goals +
      availabilityMatch * weights.availability +
      budgetMatch * weights.budget +
      timezoneMatch * weights.timezone +
      languageMatch * weights.language,
  )

  // Generate explanation
  const breakdown: string[] = []

  if (skillsMatch > 70) {
    breakdown.push(`Strong skills alignment (${Math.round(skillsMatch)}% match)`)
  } else if (skillsMatch > 40) {
    breakdown.push(`Moderate skills overlap (${Math.round(skillsMatch)}% match)`)
  } else {
    breakdown.push(`Limited skills overlap (${Math.round(skillsMatch)}% match)`)
  }

  if (goalsMatch > 70) {
    breakdown.push(`Excellent goal alignment with specializations`)
  } else if (goalsMatch > 40) {
    breakdown.push(`Good goal-specialization match`)
  }

  if (budgetMatch === 100) {
    breakdown.push(`Within your budget range`)
  } else if (budgetMatch > 50) {
    breakdown.push(`Slightly above budget but manageable`)
  } else {
    breakdown.push(`Above your preferred budget`)
  }

  if (timezoneMatch === 100) {
    breakdown.push(`Same timezone for easy scheduling`)
  } else {
    breakdown.push(`Different timezone - may require flexible scheduling`)
  }

  if (mentor.rating >= 4.8) {
    breakdown.push(`Highly rated mentor (${mentor.rating}/5.0)`)
  }

  return {
    mentor,
    score,
    explanation: {
      skillsMatch: Math.round(skillsMatch),
      goalsMatch: Math.round(goalsMatch),
      availabilityMatch: Math.round(availabilityMatch),
      budgetMatch: Math.round(budgetMatch),
      timezoneMatch: Math.round(timezoneMatch),
      languageMatch: Math.round(languageMatch),
      breakdown,
    },
  }
}

export function findMatchingMentors(mentors: Mentor[], student: StudentProfile, limit = 10): MatchResult[] {
  const matches = mentors
    .map((mentor) => calculateMentorMatch(mentor, student))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return matches
}
