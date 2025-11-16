"use client"

import { motion } from "motion/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ConsultationForm } from "@/components/consultation-form"
import { ServiceOverviewSection } from "@/components/service-overview-section"
import { AnimatedSection, AnimatedItem, AnimatedHeading } from "@/components/animated-section"
import { Users, Heart, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function EcoCSRPage() {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Community Impact",
      description: "Create meaningful social change through strategic CSR initiatives that align with your business values.",
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Stakeholder Engagement",
      description: "Build stronger relationships with employees, customers, and communities through authentic CSR programs.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Brand Reputation",
      description: "Enhance your brand image and market position through well-executed corporate social responsibility.",
    },
  ]

  const services = [
    {
      title: "CSR Strategy Development",
      description: "Comprehensive CSR strategy aligned with your business objectives and stakeholder expectations.",
    },
    {
      title: "Program Design & Implementation",
      description: "End-to-end support for designing and implementing impactful CSR initiatives across various focus areas.",
    },
    {
      title: "Impact Measurement & Reporting",
      description: "Robust frameworks for measuring and reporting CSR impact to stakeholders and regulatory bodies.",
    },
    {
      title: "Stakeholder Management",
      description: "Effective engagement strategies for building partnerships with NGOs, communities, and government bodies.",
    },
  ]

  const features = [
    {
      question: "What areas of CSR do you specialize in?",
      answer: "We work across all CSR domains including education, healthcare, environment, skill development, rural development, and disaster relief. Our approach is tailored to align with your company's values and the needs of your communities.",
    },
    {
      question: "How do you ensure CSR compliance with regulations?",
      answer: "We ensure all CSR initiatives comply with the Companies Act 2013 and other relevant regulations. We help you navigate compliance requirements while maximizing social impact.",
    },
    {
      question: "Can you help with CSR reporting?",
      answer: "Yes, we provide comprehensive CSR reporting services including annual CSR reports, impact assessments, and documentation for board presentations and regulatory filings.",
    },
    {
      question: "How do you measure CSR impact?",
      answer: "We use a combination of quantitative metrics and qualitative assessments to measure the social, environmental, and economic impact of your CSR initiatives. Our reporting includes both outputs and outcomes.",
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
                Corporate Social Responsibility
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-accent">EcoCSR</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Develop and execute impactful CSR strategies that create meaningful social change
              while building brand reputation and stakeholder trust.
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
          description="Strategic CSR consulting and implementation"
          content={[
            "EcoCSR helps organizations develop and implement corporate social responsibility strategies that create genuine social impact while delivering business value. We combine strategic thinking with practical execution to ensure your CSR initiatives are both meaningful and sustainable.",
            "From strategy development to program implementation and impact measurement, we partner with you to build a CSR program that reflects your values, engages stakeholders, and makes a lasting difference in communities.",
          ]}
        />

        {/* Benefits Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Key Benefits</h2>
              <p className="text-muted-foreground">
                Why choose EcoCSR for your organization
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

        {/* Services Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
              <p className="text-muted-foreground">
                Comprehensive CSR solutions
              </p>
            </AnimatedHeading>

            <AnimatedSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services.map((service, index) => (
                <AnimatedItem key={index}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-3xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about EcoCSR
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

