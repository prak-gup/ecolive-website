"use client"

import React, { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

interface Stat {
  value: string
  label: string
  icon?: React.ReactNode
}

interface StatsSectionProps {
  stats: Stat[]
}

function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  
  // Extract number from value string (e.g., "2K+" -> 2000)
  const extractNumber = (val: string): number => {
    const numStr = val.replace(/[^0-9.]/g, "")
    const num = parseFloat(numStr)
    if (val.includes("K") || val.includes("k")) return num * 1000
    if (val.includes("M") || val.includes("m")) return num * 1000000
    return num || 0
  }

  const number = extractNumber(value)
  const suffix = value.replace(/[0-9.]/g, "")
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  // Listen to spring value changes and update display
  useMotionValueEvent(springValue, "change", (latest) => {
    setDisplayValue(latest)
  })

  React.useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(number)
      }, delay * 100)
    }
  }, [isInView, number, motionValue, delay])

  // Format the display value
  const formatValue = (val: number): string => {
    const rounded = Math.round(val)
    if (suffix) {
      if (rounded >= 1000 && (suffix.includes("K") || suffix.includes("k"))) {
        return `${(rounded / 1000).toFixed(0)}${suffix}`
      }
      return `${rounded}${suffix}`
    }
    return rounded.toLocaleString()
  }

  return (
    <div ref={ref} className="text-4xl font-bold text-primary mb-2">
      {formatValue(displayValue)}
    </div>
  )
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
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function StatsSection({ stats }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="container py-16" ref={ref}>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="text-center w-full hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="pt-6 px-4 sm:px-6">
                {stat.icon && (
                  <motion.div
                    className="mb-4 flex justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                  >
                    {stat.icon}
                  </motion.div>
                )}
                <AnimatedCounter value={stat.value} delay={index * 0.1} />
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  {stat.label}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

