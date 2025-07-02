"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bookmark } from "lucide-react"
import type { Course } from "@/types"

interface CourseCardProps {
  course: Course
  index: number
}

export const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12 bg-gray-100">
              <AvatarFallback className="text-lg font-bold text-gray-700">{course.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm text-gray-500">STEM Link • {course.author}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside mb-4">
            {course.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Duration:</span> {course.duration}
            </p>
            <p>
              <span className="font-semibold">Ideal For:</span> {course.idealFor}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg">Book a session</Button>
            <Button variant="outline" size="icon" className="rounded-lg bg-transparent">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
