"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  avatar?: string
  initials: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="container py-16 bg-muted/50" ref={ref}>
      <div className="mx-auto max-w-5xl space-y-8">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
          <p className="text-muted-foreground">
            Trusted by leading organizations across India
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <motion.div
                    className="mb-4"
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={isInView ? { rotate: 0, opacity: 0.5 } : { rotate: -10, opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  >
                    <Quote className="h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Avatar>
                        {testimonial.avatar && (
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        )}
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

