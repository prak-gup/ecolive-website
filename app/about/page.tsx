import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsSection } from "@/components/stats-section"
import { Target, Eye, Heart, Shield, TrendingUp, Droplet, Users, Leaf } from "lucide-react"

export default function AboutPage() {
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

  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Sustainability First",
      description: "We prioritize environmental impact in every solution we deliver, ensuring measurable results for a better planet.",
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Trust & Transparency",
      description: "Building long-term partnerships through honest communication, data-driven insights, and reliable execution.",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Client-Centric",
      description: "Your success is our mission. We tailor solutions to your unique needs and support you every step of the way.",
    },
    {
      icon: <Eye className="h-8 w-8 text-accent" />,
      title: "Innovation",
      description: "Continuously evolving our methodologies and technologies to deliver cutting-edge sustainability solutions.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About <span className="text-primary">EcoLive</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Leading the transformation towards sustainable business practices across India.
              We empower organizations to achieve their ESG goals through innovative solutions
              and measurable impact.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="container py-16">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Driving sustainable transformation across businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower organizations across India to achieve their sustainability goals
                  through innovative water conservation, ESG compliance, and corporate social
                  responsibility solutions. We combine data-driven insights with practical
                  implementation to deliver measurable environmental and business impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
                <CardDescription>
                  A sustainable future for all
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become India&apos;s most trusted partner for business sustainability,
                  helping thousands of organizations reduce their environmental footprint
                  while achieving compliance and driving positive social change. We envision
                  a future where sustainable practices are the norm, not the exception.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="container py-16 bg-muted/50">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <div className="mb-4">{value.icon}</div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Impact</h2>
              <p className="text-muted-foreground">
                Measurable results across India
              </p>
            </div>
            <StatsSection stats={stats} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

