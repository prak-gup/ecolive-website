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
import { BarChart3, TrendingUp, Eye, Zap } from "lucide-react"
import Link from "next/link"

export default function EcoImpactPage() {
  const benefits = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Real-Time Dashboards",
      description: "Monitor your ESG performance in real-time with intuitive, customizable dashboards that provide actionable insights.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      title: "Performance Tracking",
      description: "Track progress against your sustainability goals with comprehensive metrics and trend analysis.",
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Transparent Reporting",
      description: "Generate professional ESG reports for stakeholders, regulators, and rating agencies with ease.",
    },
  ]

  const features = [
    {
      title: "ESG Dashboards",
      description: "Customizable dashboards showing key ESG metrics, trends, and performance indicators in real-time.",
    },
    {
      title: "Data Visualization",
      description: "Interactive charts and graphs that make complex ESG data easy to understand and share with stakeholders.",
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive ESG reports automatically, saving time and ensuring consistency across all reporting cycles.",
    },
    {
      title: "Benchmarking",
      description: "Compare your ESG performance against industry standards and best practices to identify improvement opportunities.",
    },
  ]

  const faqs = [
    {
      question: "What data sources does EcoImpact Analytics integrate with?",
      answer: "EcoImpact Analytics can integrate with various data sources including your ERP systems, IoT sensors, utility meters, HR systems, and other business applications. We also support manual data entry and file uploads.",
    },
    {
      question: "How customizable are the dashboards?",
      answer: "Our dashboards are highly customizable. You can choose which metrics to display, set up custom KPIs, configure alerts, and personalize the layout to match your organization's needs and reporting requirements.",
    },
    {
      question: "Can I export reports in different formats?",
      answer: "Yes, you can export reports in multiple formats including PDF, Excel, and CSV. Reports can be customized with your branding and formatted according to various reporting frameworks (GRI, SASB, TCFD, etc.).",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security measures including encryption, access controls, and regular security audits. Your data is stored securely and we comply with all relevant data protection regulations.",
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
                Analytics & Reporting
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary">EcoImpact</span> Analytics
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your ESG data into actionable insights with powerful dashboards,
              automated reporting, and comprehensive analytics. Make data-driven decisions
              for sustainable business growth.
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
          description="Advanced ESG analytics and reporting platform"
          content={[
            "EcoImpact Analytics provides a comprehensive platform for tracking, analyzing, and reporting your ESG performance. Our solution transforms complex sustainability data into clear, actionable insights that drive decision-making and demonstrate your commitment to stakeholders.",
            "With real-time dashboards, automated reporting, and powerful analytics, you can monitor your progress, identify opportunities for improvement, and communicate your impact effectively to investors, customers, and regulators.",
          ]}
        />

        {/* Benefits Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Key Benefits</h2>
              <p className="text-muted-foreground">
                Why choose EcoImpact Analytics
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

        {/* Features Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Platform Features</h2>
              <p className="text-muted-foreground">
                Everything you need for ESG analytics
              </p>
            </AnimatedHeading>

            <AnimatedSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <AnimatedItem key={index}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-3xl space-y-8">
            <AnimatedHeading className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about EcoImpact Analytics
              </p>
            </AnimatedHeading>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
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

