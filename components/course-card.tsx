"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
            <Card className="rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-white border-0">
                <CardContent className="p-8 flex flex-col flex-grow">
                    {/* Header Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="w-16 h-16 bg-orange-400 rounded-2xl">
                            <AvatarImage src={course.initials} alt={course.title} />
                            <AvatarFallback className="text-2xl font-bold text-white bg-transparent rounded-2xl">
                                {course.title.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 font-medium">STEM Link • {course.author}</p>
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {course.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="rounded-md px-4 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium text-sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-base">{course.description}</p>

                    {/* Features List */}
                    <ul className="space-y-3 text-gray-700 mb-6">
                        {course.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                <span className="text-base leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Course Details */}
                    <div className="mt-auto space-y-3 text-base">
                        <div className="flex items-start">
                            <span className="font-bold text-gray-900 min-w-[80px]">Duration:</span>
                            <span className="text-gray-700 ml-2">{course.duration}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-bold text-gray-900 min-w-[80px]">Ideal For:</span>
                            <span className="text-gray-700 ml-2">{course.idealFor}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex items-center gap-3">
                        <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-3 px-6 font-semibold text-base transition-colors cursor-pointer">
                            Book a session
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl p-3 bg-transparent border-gray-200 hover:bg-gray-50 transition-colors"
                            aria-label="Bookmark"
                        >
                            <Bookmark className="w-5 h-5 text-gray-600" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}