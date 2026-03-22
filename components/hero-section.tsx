"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { WaterParticles } from "@/components/ui/water-particles"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary to-primary-container py-24 md:py-32 lg:py-40">
      <WaterParticles className="z-0 opacity-40 mix-blend-overlay" intensity={0.5} particleCount={80} interactive={true} />
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge className="bg-surface-lowest/10 text-white hover:bg-surface-lowest/20 border-white/20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-md">
            Restore the balance
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
            <TextGenerateEffect
              words="Catch Every Drop. Regenerating the Planet Through Measurable Impact"
              className="text-center text-white"
              filter={false}
              duration={0.5}
            />
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="mx-auto max-w-2xl text-lg text-primary-foreground/90 sm:text-xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          India&apos;s leading ESG &amp; Water Sustainability Solutions firm. Merging organic design with eco-technical precision.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-primary hover:bg-surface-low text-base sm:text-lg px-8 py-6 h-auto tracking-wide font-semibold water-shadow"
          >
            <Link href="/contact">Book Site Visit →</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}

