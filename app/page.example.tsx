/**
 * Example Homepage Implementation
 * 
 * This file demonstrates how to use all the EcoLive website components together.
 * Copy this content to app/page.tsx after completing the setup instructions.
 */

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesOverview } from "@/components/services-overview"
import { ConsultationForm } from "@/components/consultation-form"
import { Droplet, Leaf, TrendingUp, Users } from "lucide-react"

export default function Home() {
  // Stats data for the StatsSection component
  const stats = [
    {
      value: "2K+",
      label: "Projects Completed",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
    },
    {
      value: "1K+ ML",
      label: "Water Saved",
      icon: <Droplet className="h-8 w-8 text-accent" />,
    },
    {
      value: "14+",
      label: "States Served",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      value: "500+",
      label: "Happy Clients",
      icon: <Leaf className="h-8 w-8 text-accent" />,
    },
  ]

  // Services data for the ServicesOverview component
  const services = [
    {
      id: "ecowater",
      name: "EcoWater",
      description: "Rainwater harvesting & reuse solutions",
      icon: <Droplet className="h-6 w-6 text-accent" />,
      features: [
        "Custom rainwater harvesting systems",
        "Water reuse and recycling solutions",
        "Compliance with water regulations",
        "ROI tracking and reporting",
      ],
      href: "/services/ecowater",
    },
    {
      id: "ecoesg",
      name: "EcoESG",
      description: "ESG consulting & strategy (ECHO Framework)",
      icon: <Leaf className="h-6 w-6 text-primary" />,
      features: [
        "ESG strategy development",
        "ECHO Framework implementation",
        "Compliance support",
        "Impact measurement",
      ],
      href: "/services/ecoesg",
    },
    {
      id: "ecocsr",
      name: "EcoCSR",
      description: "Corporate social responsibility strategy",
      icon: <Users className="h-6 w-6 text-accent" />,
      features: [
        "CSR strategy development",
        "Community engagement programs",
        "Sustainability reporting",
        "Stakeholder management",
      ],
      href: "/services/ecocsr",
    },
    {
      id: "ecoimpact",
      name: "EcoImpact Analytics",
      description: "ESG dashboards & reporting",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      features: [
        "Real-time ESG dashboards",
        "Custom reporting",
        "Data visualization",
        "Performance tracking",
      ],
      href: "/services/ecoimpact",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection stats={stats} />
        <ServicesOverview services={services} />
        <section className="container px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <ConsultationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

