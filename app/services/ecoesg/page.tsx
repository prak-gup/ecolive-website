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
import { Leaf, CheckCircle2, BarChart3, Shield } from "lucide-react"
import Link from "next/link"

export default function EcoESGPage() {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "ESG Compliance",
      description: "Navigate complex ESG regulations with confidence using our ECHO Framework methodology.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-accent" />,
      title: "Data-Driven Strategy",
      description: "Make informed decisions with comprehensive ESG assessments and impact measurements.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Stakeholder Trust",
      description: "Build credibility and trust with transparent ESG reporting and proven results.",
    },
  ]

  const echoFramework = [
    {
      step: "E",
      title: "Evaluate",
      description: "Comprehensive assessment of your current ESG performance, risks, and opportunities.",
    },
    {
      step: "C",
      title: "Create",
      description: "Develop a customized ESG strategy aligned with your business goals and stakeholder expectations.",
    },
    {
      step: "H",
      title: "Implement",
      description: "Execute your ESG initiatives with our proven methodologies and best practices.",
    },
    {
      step: "O",
      title: "Optimize",
      description: "Continuously monitor, measure, and optimize your ESG performance for maximum impact.",
    },
  ]

  const features = [
    {
      question: "What is the ECHO Framework?",
      answer: "The ECHO Framework is our proprietary 4-step methodology (Evaluate, Create, Implement, Optimize) designed to help organizations systematically develop and execute their ESG strategies. It ensures comprehensive coverage of all ESG dimensions while maintaining focus on measurable outcomes.",
    },
    {
      question: "How long does ESG strategy development take?",
      answer: "The timeline varies based on your organization's size and complexity. Typically, initial assessment and strategy development takes 4-8 weeks, with full implementation spanning 6-12 months depending on the scope of initiatives.",
    },
    {
      question: "Do you help with ESG reporting?",
      answer: "Yes, we provide comprehensive ESG reporting services including GRI, SASB, and TCFD-aligned reports. We also help you prepare for ESG ratings and certifications.",
    },
    {
      question: "What industries do you serve?",
      answer: "We work with organizations across various industries including manufacturing, real estate, technology, healthcare, and more. Our ECHO Framework is adaptable to any sector.",
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
                ESG Consulting
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary">EcoESG</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Navigate ESG compliance and drive sustainable business growth with our proven
              ECHO Framework. From strategy to implementation, we guide you every step of the way.
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
          description="ESG consulting powered by the ECHO Framework"
          content={[
            "EcoESG provides comprehensive ESG consulting services designed to help organizations navigate the complex landscape of environmental, social, and governance requirements. Our proprietary ECHO Framework ensures a systematic approach to ESG strategy development and implementation.",
            "Whether you're just starting your ESG journey or looking to enhance existing initiatives, we provide the expertise, tools, and support needed to achieve compliance, build stakeholder trust, and drive sustainable business value.",
          ]}
        />

        {/* Benefits Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Key Benefits</h2>
              <p className="text-muted-foreground">
                Why choose EcoESG for your organization
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

        {/* ECHO Framework Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">The ECHO Framework</h2>
              <p className="text-muted-foreground">
                Our proven 4-step methodology for ESG success
              </p>
            </AnimatedHeading>

            <Tabs defaultValue="evaluate" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="implement">Implement</TabsTrigger>
                <TabsTrigger value="optimize">Optimize</TabsTrigger>
              </TabsList>

              {echoFramework.map((step, index) => (
                <TabsContent key={index} value={step.title.toLowerCase()}>
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
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about EcoESG
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

