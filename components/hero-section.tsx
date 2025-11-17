"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { WaterParticles } from "@/components/ui/water-particles"

export function HeroSection() {
  return (
    <section className="container py-24 md:py-32 relative overflow-hidden">
      <WaterParticles className="z-0" intensity={0.5} particleCount={60} interactive={true} />
      <div className="mx-auto max-w-4xl text-center space-y-6 relative z-10">
        {/* Trust Badge */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Badge variant="outline" className="text-xs sm:text-sm">
              2K+ Projects Completed
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Badge variant="outline" className="text-xs sm:text-sm">
              14+ States Served
            </Badge>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <TextGenerateEffect
              words="Transform Your Business Through Sustainable Solutions"
              className="text-center"
              filter={false}
              duration={0.5}
            />
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Leading B2B sustainability platform for ESG compliance, water conservation, and
          corporate social responsibility. Data-driven solutions with measurable impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-brand-green-hover text-primary-foreground text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
            >
              <Link href="/contact">Request Consultation</Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.p
          className="text-sm text-muted-foreground pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Trusted by leading organizations across India
        </motion.p>
      </div>
    </section>
  )
}

