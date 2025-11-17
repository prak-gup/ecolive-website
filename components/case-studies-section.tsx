"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface CaseStudy {
  id: string
  title: string
  description: string
  category: string
  image?: string
  imageAlt?: string
  href: string
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="container py-16" ref={ref}>
      <div className="mx-auto max-w-6xl space-y-8">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
          <p className="text-muted-foreground">
            Real results from real businesses
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {caseStudy.image && (
                  <motion.div
                    className="relative h-48 w-full overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.imageAlt || caseStudy.title}
                      fill
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                )}
                <CardHeader>
                  <motion.div
                    className="mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge variant="outline" className="group-hover:border-primary transition-colors">
                      {caseStudy.category}
                    </Badge>
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {caseStudy.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={caseStudy.href}>Read More</Link>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

