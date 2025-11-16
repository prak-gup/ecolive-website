"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Validation schema
const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().min(1, "Company name is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to the terms"),
})

type ConsultationFormValues = z.infer<typeof consultationSchema>

interface ConsultationFormProps {
  variant?: "default" | "compact"
  onSuccess?: () => void
}

export function ConsultationForm({ variant = "default", onSuccess }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      consent: false,
    },
  })

  async function onSubmit(values: ConsultationFormValues) {
    try {
      setIsSubmitting(true)
      setSubmitStatus("idle")
      setErrorMessage(null)

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to submit consultation request")
      }

      // Success
      setSubmitStatus("success")
      form.reset()

      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } catch (err) {
      setSubmitStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Success Message */}
        {submitStatus === "success" && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="font-medium">
              Thank you! We&apos;ll get back to you within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {submitStatus === "error" && errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+91 12345 67890"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We&apos;ll use this to contact you if needed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Field */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Company Name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Selection */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Interest *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ecowater">EcoWater</SelectItem>
                  <SelectItem value="ecoesg">EcoESG</SelectItem>
                  <SelectItem value="ecocsr">EcoCSR</SelectItem>
                  <SelectItem value="ecoimpact">EcoImpact Analytics</SelectItem>
                  <SelectItem value="multiple">Multiple Services</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your sustainability goals and requirements..."
                  className="resize-none"
                  rows={5}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0} / 1000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Consent Checkbox */}
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  I agree to receive communications from EcoLive and understand that my
                  information will be used in accordance with the Privacy Policy. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-brand-green-hover text-primary-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request Consultation"
          )}
        </Button>
      </form>
    </Form>
  )

  if (variant === "compact") {
    return formContent
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Consultation</CardTitle>
        <CardDescription>
          Get in touch with our team to discuss how EcoLive can help your business achieve
          its sustainability goals.
        </CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  )
}

