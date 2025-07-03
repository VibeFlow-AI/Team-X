"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Clock, ExternalLink } from "lucide-react"
import type { MatchResult } from "@/lib/matching-algorithm"

interface MentorCardProps {
  matchResult: MatchResult
  onBookSession: (mentorId: string) => void
  onViewProfile: (mentorId: string) => void
}

export function MentorCard({ matchResult, onBookSession, onViewProfile }: MentorCardProps) {
  const { mentor, score, explanation } = matchResult

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{mentor.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground">
                {mentor.title} at {mentor.company}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{mentor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({mentor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{score}%</div>
            <div className="text-xs text-muted-foreground">match</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{mentor.timezone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{mentor.experience} years exp</span>
          </div>
          <div className="font-semibold">${mentor.hourlyRate}/hr</div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
            <div className="flex flex-wrap gap-1">
              {mentor.skills.slice(0, 4).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {mentor.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{mentor.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Why this match?</p>
            <div className="text-xs text-muted-foreground">
              {explanation.breakdown.slice(0, 2).map((reason, idx) => (
                <div key={idx}>• {reason}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {mentor.socialLinks.linkedin && (
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            {mentor.socialLinks.github && (
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onViewProfile(mentor.id)}>
              View Profile
            </Button>
            <Button size="sm" onClick={() => onBookSession(mentor.id)}>
              Book Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
