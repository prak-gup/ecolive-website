"use client"

import { motion } from "motion/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ConsultationForm } from "@/components/consultation-form"
import { ServiceOverviewSection } from "@/components/service-overview-section"
import { AnimatedSection, AnimatedItem, AnimatedHeading } from "@/components/animated-section"
import { Droplet, CheckCircle2, Calculator } from "lucide-react"
import Link from "next/link"

export default function EcoWaterPage() {
  const benefits = [
    {
      icon: <Droplet className="h-6 w-6 text-accent" />,
      title: "Water Conservation",
      description: "Reduce water consumption by up to 50% through efficient rainwater harvesting and reuse systems.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Regulatory Compliance",
      description: "Meet all water-related regulations and sustainability mandates with our compliant solutions.",
    },
    {
      icon: <Calculator className="h-6 w-6 text-accent" />,
      title: "Cost Savings",
      description: "Significant reduction in water bills and operational costs with measurable ROI.",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Assessment",
      description: "We conduct a comprehensive analysis of your water usage patterns, site conditions, and regulatory requirements.",
    },
    {
      step: "02",
      title: "Design",
      description: "Our experts design a customized rainwater harvesting system tailored to your specific needs and infrastructure.",
    },
    {
      step: "03",
      title: "Installation",
      description: "Professional installation by certified technicians ensuring quality and compliance with all standards.",
    },
    {
      step: "04",
      title: "Monitoring",
      description: "Ongoing monitoring and maintenance to ensure optimal performance and maximum water savings.",
    },
  ]

  const features = [
    {
      question: "What types of rainwater harvesting systems do you offer?",
      answer: "We offer a range of systems including rooftop harvesting, surface runoff collection, and groundwater recharge systems. Each system is customized based on your site conditions and water requirements.",
    },
    {
      question: "How much water can I save with EcoWater solutions?",
      answer: "Depending on your location and rainfall patterns, our systems can help you save 30-50% of your total water consumption. We provide detailed projections during the assessment phase.",
    },
    {
      question: "What is the typical ROI for a rainwater harvesting system?",
      answer: "Most clients see a return on investment within 2-4 years, depending on water costs in their area and system size. We provide detailed ROI calculations during consultation.",
    },
    {
      question: "Do you handle maintenance and monitoring?",
      answer: "Yes, we offer comprehensive maintenance packages and real-time monitoring solutions to ensure your system operates at peak efficiency throughout its lifespan.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">
                Water Sustainability
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-accent">EcoWater</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your water sustainability with innovative rainwater harvesting and
              reuse solutions. Reduce costs, ensure compliance, and make a measurable
              environmental impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-brand-green-hover text-white"
              >
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <ServiceOverviewSection
          title="Overview"
          description="Comprehensive water sustainability solutions"
          content={[
            "EcoWater provides end-to-end rainwater harvesting and water reuse solutions designed for businesses looking to reduce water consumption, lower costs, and achieve sustainability goals. Our systems are engineered for maximum efficiency and compliance with all regulatory requirements.",
            "From initial assessment to ongoing maintenance, we partner with you to ensure your water sustainability initiatives deliver measurable results and long-term value for your organization.",
          ]}
        />

        {/* Benefits Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Key Benefits</h2>
              <p className="text-muted-foreground">
                Why choose EcoWater for your organization
              </p>
            </AnimatedHeading>

            <AnimatedSection className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <AnimatedItem key={index}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <motion.div
                        className="mb-4"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring", delay: index * 0.1 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="text-muted-foreground">
                Our proven 4-step process
              </p>
            </AnimatedHeading>

            <Tabs defaultValue="step1" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="step1">Step 1</TabsTrigger>
                <TabsTrigger value="step2">Step 2</TabsTrigger>
                <TabsTrigger value="step3">Step 3</TabsTrigger>
                <TabsTrigger value="step4">Step 4</TabsTrigger>
              </TabsList>

              {steps.map((step, index) => (
                <TabsContent key={index} value={`step${index + 1}`}>
                  <Card>
                    <CardHeader>
                      <div className="text-4xl font-bold text-primary mb-2">
                        {step.step}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-3xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
              <p className="text-muted-foreground">
                Everything you need for water sustainability
              </p>
            </AnimatedHeading>

            <Accordion type="single" collapsible className="w-full">
              {features.map((feature, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{feature.question}</AccordionTrigger>
                  <AccordionContent>{feature.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Consultation Form Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-2xl">
            <ConsultationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

