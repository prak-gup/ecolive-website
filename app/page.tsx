import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesOverview } from "@/components/services-overview"
import { ConsultationForm } from "@/components/consultation-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
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

  // Testimonials data
  const testimonials = [
    {
      id: "1",
      quote:
        "EcoLive transformed our water management approach. We've reduced our water consumption by 45% and achieved significant cost savings while meeting all compliance requirements.",
      name: "Rajesh Kumar",
      title: "Operations Director",
      company: "TechCorp Industries",
      initials: "RK",
    },
    {
      id: "2",
      quote:
        "The ECHO Framework implementation was seamless. EcoLive's team guided us through every step, and we now have a comprehensive ESG strategy that aligns with our business goals.",
      name: "Priya Sharma",
      title: "Sustainability Manager",
      company: "GreenBuild Solutions",
      initials: "PS",
    },
    {
      id: "3",
      quote:
        "Working with EcoLive has been a game-changer for our CSR initiatives. Their data-driven approach helped us maximize our impact and demonstrate real value to stakeholders.",
      name: "Amit Patel",
      title: "CSR Head",
      company: "Future Enterprises",
      initials: "AP",
    },
    {
      id: "4",
      quote:
        "The EcoImpact Analytics dashboard gives us real-time visibility into our sustainability metrics. It's been invaluable for reporting and decision-making.",
      name: "Sneha Reddy",
      title: "ESG Compliance Officer",
      company: "Sustainable Manufacturing Ltd",
      initials: "SR",
    },
    {
      id: "5",
      quote:
        "EcoLive's rainwater harvesting system exceeded our expectations. The ROI was better than projected, and the ongoing support has been excellent.",
      name: "Vikram Singh",
      title: "Facilities Manager",
      company: "Metro Commercial Properties",
      initials: "VS",
    },
    {
      id: "6",
      quote:
        "The team at EcoLive understands the unique challenges of B2B sustainability. Their solutions are practical, measurable, and deliver real business value.",
      name: "Anjali Mehta",
      title: "VP of Operations",
      company: "Innovation Hub",
      initials: "AM",
    },
  ]

  // Case studies data
  const caseStudies = [
    {
      id: "1",
      title: "Manufacturing Company: 50% Water Reduction",
      description:
        "How a leading manufacturer reduced water consumption by 50% using EcoWater solutions, achieving ₹2.5M annual savings.",
      category: "EcoWater",
      href: "/resources/case-studies/manufacturing-water-reduction",
    },
    {
      id: "2",
      title: "Tech Company: ESG Transformation",
      description:
        "Complete ESG transformation journey of a technology company using the ECHO Framework, improving their ESG score by 40%.",
      category: "EcoESG",
      href: "/resources/case-studies/tech-esg-transformation",
    },
    {
      id: "3",
      title: "Real Estate: CSR Impact Story",
      description:
        "Measuring and maximizing CSR impact in the real estate sector, engaging 10,000+ community members through strategic programs.",
      category: "EcoCSR",
      href: "/resources/case-studies/real-estate-csr",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection stats={stats} />
        <ServicesOverview services={services} />
        <TestimonialsSection testimonials={testimonials} />
        <CaseStudiesSection caseStudies={caseStudies} />
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
