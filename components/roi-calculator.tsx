"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calculator, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Validation schema
const calculatorSchema = z.object({
  monthlyWaterUsage: z
    .string()
    .min(1, "Water usage is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  currentWaterCost: z
    .string()
    .min(1, "Water cost is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  location: z.string().min(1, "Please select a location"),
})

type CalculatorFormValues = z.infer<typeof calculatorSchema>

interface ROICalculatorProps {
  serviceType?: "ecowater" | "ecoesg" | "ecocsr" | "ecoimpact"
}

export function ROICalculator({ serviceType = "ecowater" }: ROICalculatorProps) {
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<{
    annualSavings: number
    monthlySavings: number
    roiPercentage: number
    paybackPeriod: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      monthlyWaterUsage: "",
      currentWaterCost: "",
      location: "",
    },
  })

  async function onSubmit(values: CalculatorFormValues) {
    try {
      setIsCalculating(true)

      // Simulate calculation (replace with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const monthlyUsage = Number(values.monthlyWaterUsage)
      const monthlyCost = Number(values.currentWaterCost)
      
      // Calculate savings (assuming 40% reduction for water services)
      const savingsPercentage = serviceType === "ecowater" ? 0.4 : 0.25
      const monthlySavings = monthlyCost * savingsPercentage
      const annualSavings = monthlySavings * 12
      
      // Estimate system cost based on usage (simplified)
      const estimatedSystemCost = monthlyUsage * 1000 // Simplified calculation
      const paybackPeriod = estimatedSystemCost / monthlySavings
      const roiPercentage = (annualSavings / estimatedSystemCost) * 100

      setResults({
        annualSavings: Math.round(annualSavings),
        monthlySavings: Math.round(monthlySavings),
        roiPercentage: Math.round(roiPercentage * 10) / 10,
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      })
    } catch (err) {
      console.error("Calculation error:", err)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    form.reset()
    setResults(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate ROI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ROI Calculator</DialogTitle>
          <DialogDescription>
            Calculate your potential savings and return on investment with our solutions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="monthlyWaterUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Water Usage (Liters)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        disabled={isCalculating}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your average monthly water consumption
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentWaterCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Monthly Water Cost (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        disabled={isCalculating}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your current monthly water bill amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isCalculating}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your primary location for accurate calculations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isCalculating}
                  className="flex-1 bg-primary hover:bg-brand-green-hover text-primary-foreground"
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </>
                  )}
                </Button>
                {results && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isCalculating}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </Form>

          {results && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Estimated Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{results.monthlySavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{results.annualSavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {results.roiPercentage}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-lg font-semibold">{results.paybackPeriod} months</p>
                  </div>
                </div>

                <Alert>
                  <AlertDescription className="text-sm">
                    <strong>Note:</strong> These are estimated values based on industry averages.
                    Actual savings may vary based on specific conditions and implementation.
                    Contact us for a detailed assessment.
                  </AlertDescription>
                </Alert>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-brand-green-hover text-primary-foreground"
                  onClick={() => setOpen(false)}
                >
                  <a href="/contact">Request Detailed Consultation</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

