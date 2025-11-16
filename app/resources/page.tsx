import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, BookOpen, Download } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Whitepapers",
      icon: <FileText className="h-6 w-6 text-accent" />,
      items: [
        {
          title: "The Complete Guide to ESG Compliance in India",
          description: "Comprehensive guide covering all aspects of ESG compliance, regulations, and best practices.",
          type: "PDF",
          size: "2.5 MB",
        },
        {
          title: "Water Sustainability: ROI Analysis",
          description: "Detailed analysis of ROI for rainwater harvesting systems across different industries.",
          type: "PDF",
          size: "1.8 MB",
        },
        {
          title: "CSR Strategy Framework",
          description: "Step-by-step framework for developing and implementing effective CSR strategies.",
          type: "PDF",
          size: "3.2 MB",
        },
      ],
    },
    {
      category: "Case Studies",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      items: [
        {
          title: "Manufacturing Company: 50% Water Reduction",
          description: "How a leading manufacturer reduced water consumption by 50% using EcoWater solutions.",
          type: "Case Study",
          size: "1.2 MB",
        },
        {
          title: "Tech Company: ESG Transformation",
          description: "Complete ESG transformation journey of a technology company using the ECHO Framework.",
          type: "Case Study",
          size: "2.1 MB",
        },
        {
          title: "Real Estate: CSR Impact Story",
          description: "Measuring and maximizing CSR impact in the real estate sector.",
          type: "Case Study",
          size: "1.5 MB",
        },
      ],
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
              Resources & <span className="text-primary">Insights</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Access our library of whitepapers, case studies, and guides to help you on your
              sustainability journey.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-6xl space-y-12">
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 bg-muted/50">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Need More Information?</CardTitle>
              <CardDescription>
                Get in touch with our team for personalized guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-brand-green-hover text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}

