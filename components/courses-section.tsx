"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { courseData } from "@/data/courses"
import { CourseCard } from "@/components/course-card"

export const CoursesSection = () => {
  const [visibleCourses, setVisibleCourses] = useState(3)

  const loadMoreCourses = () => {
    setVisibleCourses((prev) => Math.min(prev + 3, courseData.length))
  }

  return (
    <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Course Highlights – Trending Now
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the sessions students are raving about. These expert-led, high-impact courses are designed to help you
            unlock your full potential whether you're polishing your resume, mapping out your career path, or getting
            ready to ace technical interviews.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData.slice(0, visibleCourses).map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
        {visibleCourses < courseData.length && (
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" className="rounded-lg bg-transparent" onClick={loadMoreCourses}>
                Load More Sessions
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
