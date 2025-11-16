"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceOverviewSectionProps {
  title: string
  description: string
  content: string[]
}

export function ServiceOverviewSection({ title, description, content }: ServiceOverviewSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="container py-12 sm:py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-2 border-primary/10 bg-gradient-to-br from-background to-muted/30 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-2xl sm:text-3xl mb-2">{title}</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                {description}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-muted-foreground leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

