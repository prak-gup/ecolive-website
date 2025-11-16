import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Ready to transform your business through sustainable solutions? Let&apos;s start
              a conversation about how EcoLive can help you achieve your ESG goals.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="container py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        <a
                          href="mailto:info@ecolive.com"
                          className="hover:text-foreground transition-colors"
                        >
                          info@ecolive.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-accent/10 p-3">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        <a
                          href="tel:+911234567890"
                          className="hover:text-foreground transition-colors"
                        >
                          +91 12345 67890
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-sm text-muted-foreground">
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

