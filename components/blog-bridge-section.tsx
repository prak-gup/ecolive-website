"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Ground Water Replenishment",
    excerpt: "Discover how AI-driven analytics are transforming the way we measure corporate water footprints in real-time.",
    category: "Insights"
  },
  {
    id: 2,
    title: "Navigating ESG Compliance in 2026",
    excerpt: "A comprehensive guide for enterprise businesses to meet the new stringent environmental reporting standards.",
    category: "Corporate Policy"
  },
  {
    id: 3,
    title: "Why 'Zero Net Water' is the New Carbon Neutral",
    excerpt: "Case studies from 5 leading Indian corporations that successfully achieved zero net water within 18 months.",
    category: "Case Studies"
  }
]

export function BlogBridgeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="container py-20 lg:py-32" ref={ref}>
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.span
          className="px-4 py-2 rounded-full bg-surface-container-low text-primary text-sm font-semibold tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          EcoImpact Knowledge Base
        </motion.span>
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-[#002020] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Latest Environmental Insights
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Dive deep into our latest research, policy updates, and success stories.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full flex flex-col border-none water-shadow bg-white rounded-[2rem] overflow-hidden group">
              <div className="h-48 bg-[#ccefee] relative overflow-hidden flex items-center justify-center">
                 <div className="text-secondary-foreground/30 font-bold text-6xl rotate-[-10deg] opacity-20 transition-transform group-hover:scale-110 duration-700">
                    ECO
                 </div>
              </div>
              <CardHeader className="pt-6 pb-2">
                <p className="text-sm font-semibold text-primary/80 mb-2">{post.category}</p>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-secondary-foreground text-base leading-relaxed">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button variant="ghost" className="p-0 text-primary font-semibold hover:bg-transparent hover:underline">
                  Read Article →
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
