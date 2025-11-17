"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Service {
  id: string
  name: string
  description: string
  icon?: React.ReactNode
  features: string[]
  href: string
}

interface ServicesOverviewProps {
  services: Service[]
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

const cardVariants = {
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

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(services[0]?.id)

  return (
    <section className="container py-12 sm:py-16" ref={ref}>
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
          <p className="text-muted-foreground">
            Comprehensive sustainability solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Mobile: Tabbed Interface */}
        <div className="block lg:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile: Select Dropdown */}
            <div className="block sm:hidden mb-6">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full h-12 text-base font-medium">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id} className="text-base py-3">
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tablet: Tabs */}
            <div className="hidden sm:block">
              <TabsList className="grid w-full grid-cols-2 h-auto p-1 gap-2">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger
                      value={service.id}
                      className="text-sm px-3 py-2 transition-all"
                    >
                      {service.name}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-6 sm:mt-2">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-6 sm:pt-6">
                      {service.icon && (
                        <motion.div
                          className="mb-4 sm:mb-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                        >
                          {service.icon}
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardTitle className="text-xl sm:text-2xl">{service.name}</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-2">
                          {service.description}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="pb-4 sm:pb-6 px-4 sm:px-6">
                      <motion.ul
                        className="space-y-3 sm:space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 sm:gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <motion.span
                              className="text-primary mt-0.5 sm:mt-1 text-lg sm:text-base flex-shrink-0"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            >
                              ✓
                            </motion.span>
                            <span className="text-sm sm:text-sm leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                    <CardFooter className="pt-4 sm:pt-6 px-4 sm:px-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          <Link href={service.href}>Learn More</Link>
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop: Grid Layout - All Services Visible */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    {service.icon && (
                      <motion.div
                        className="flex-shrink-0"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        {service.icon}
                      </motion.div>
                    )}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 border-t">
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
                      <Link href={service.href}>Learn More</Link>
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

