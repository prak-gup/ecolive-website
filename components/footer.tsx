import Link from "next/link"
import { Logo } from "./logo"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo className="h-6 w-auto" />
            <p className="text-sm text-muted-foreground">
              Transforming businesses through sustainable solutions. Leading the way in ESG
              compliance, water sustainability, and corporate social responsibility.
            </p>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/ecowater"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  EcoWater
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecoesg"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  EcoESG
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecocsr"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  EcoCSR
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecoimpact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  EcoImpact Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/resources/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/case-studies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/whitepapers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#consultation"
                  className="hover:text-foreground transition-colors"
                >
                  Request Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EcoLive. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

