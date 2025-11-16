# Component Research for EcoLive Website

Research Date: 2024-12-19
Registry: @shadcn (https://ui.shadcn.com)

---

## Installation Commands

Install all required components with:

```bash
npx shadcn@latest add button card form input textarea select checkbox label dialog tabs accordion badge avatar skeleton navigation-menu separator table carousel popover tooltip dropdown-menu command scroll-area collapsible aspect-ratio switch radio-group
```

**Note:** Some components mentioned in requirements may need custom implementation or alternative registries:
- `alert` - Not found in @shadcn, may need custom implementation or check @magicui/@aceternity
- `progress` - Not found in @shadcn, may need custom implementation or check @magicui/@aceternity
- `sheet` - Not found in @shadcn, may need custom implementation or check @magicui/@aceternity
- `hover-card` - Not found in @shadcn, may need custom implementation or check @magicui/@aceternity
- `chart` - Not a standard shadcn component, use recharts or chart.js with shadcn styling

---

## Component Details

### 1. Button Component

**Purpose:** Styled button with multiple variants for CTAs, actions, and navigation

**Dependencies:**
- `@radix-ui/react-slot`

**Key Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `disabled`: boolean
- `type`: "button" | "submit" | "reset"
- `asChild`: boolean (for composition with Radix)

**Best Practice Example:**
```tsx
import { Button } from "@/components/ui/button"

// Primary CTA
<Button variant="default" size="lg" className="bg-[#7CC95B] hover:bg-[#6BB04A]">
  Request Consultation
</Button>

// Secondary CTA
<Button variant="outline" size="lg">
  Learn More
</Button>

// Submit button with loading state
<Button 
  type="submit" 
  disabled={isSubmitting}
  className="w-full"
>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    "Submit"
  )}
</Button>

// Destructive action
<Button variant="destructive" onClick={handleDelete}>
  Delete
</Button>
```

**Common Patterns:**
- Use `variant="default"` for primary CTAs (customize with brand colors)
- Use `variant="outline"` for secondary actions
- Show loading spinner during async operations
- Disable button during submission to prevent double-clicks
- Use `type="submit"` for form buttons
- Use `variant="destructive"` for delete/remove actions

**Brand Integration:**
- Customize default variant with brand green (`#7CC95B`) for primary CTAs
- Use brand blue (`#0099D5`) for secondary/outline variants

---

### 2. Card Component

**Purpose:** Container component for content sections, service cards, stat cards, testimonials

**Dependencies:**
- None (pure CSS component)

**Key Props:**
- `className`: Additional styling classes

**Component Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions or additional info */}
  </CardFooter>
</Card>
```

**Best Practice Example:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

// Service Card
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>EcoWater</CardTitle>
    <CardDescription>Rainwater harvesting solutions</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Transform your water sustainability...</p>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>

// Stat Card
<Card>
  <CardContent className="pt-6">
    <div className="text-4xl font-bold">2K+</div>
    <p className="text-muted-foreground">Projects Completed</p>
  </CardContent>
</Card>

// Testimonial Card
<Card>
  <CardContent className="pt-6">
    <p className="mb-4">"EcoLive transformed our water management..."</p>
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">John Doe</p>
        <p className="text-sm text-muted-foreground">CEO, Company Inc.</p>
      </div>
    </div>
  </CardContent>
</Card>
```

**Common Patterns:**
- Use CardHeader for titles and descriptions
- Use CardContent for main content
- Use CardFooter for actions (buttons, links)
- Add hover effects for interactive cards
- Use grid layouts for card collections
- Maintain consistent padding and spacing

---

### 3. Form Component

**Purpose:** Form validation and submission wrapper using react-hook-form

**Dependencies:**
- `@radix-ui/react-label`
- `@radix-ui/react-slot`
- `@hookform/resolvers`
- `zod`
- `react-hook-form`

**Key Props:**
- `form`: Form instance from `useForm` hook
- `onSubmit`: Form submission handler

**Best Practice Example:**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(1, "Company is required"),
  message: z.string().max(1000, "Message too long").optional(),
  consent: z.boolean().refine(val => val === true, "Consent required")
})

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      message: "",
      consent: false
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // API call
      await submitForm(values)
      // Success handling
    } catch (error) {
      // Error handling
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Your Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your needs..."
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Maximum 1000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Request Consultation"}
        </Button>
      </form>
    </Form>
  )
}
```

**Common Patterns:**
- Use Zod for schema validation
- Use `FormField` for each input
- Wrap inputs with `FormItem` for layout
- Include `FormLabel` for accessibility
- Use `FormMessage` for error display
- Handle async submission with loading states
- Reset form on successful submission
- Show success/error alerts after submission

---

### 4. Input Component

**Purpose:** Text input fields with consistent styling

**Dependencies:**
- None (pure CSS component)

**Key Props:**
- `type`: Input type (text, email, password, tel, number, etc.)
- `placeholder`: Placeholder text
- `disabled`: Disable input
- `required`: HTML5 validation
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Standalone input
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email"
    type="email" 
    placeholder="you@example.com"
    required
  />
</div>

// With FormField (recommended)
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input
          type="email"
          placeholder="you@example.com"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Common Patterns:**
- Always use with `Label` or `FormLabel` for accessibility
- Include placeholder for better UX
- Use appropriate `type` for validation (email, tel, etc.)
- Use `disabled` state during form submission
- Add proper ARIA attributes when needed

---

### 5. Textarea Component

**Purpose:** Multi-line text input for messages, descriptions, detailed inquiries

**Dependencies:**
- None (pure CSS component)

**Key Props:**
- `placeholder`: Placeholder text
- `disabled`: Disable textarea
- `rows`: Number of visible rows
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { Textarea } from "@/components/ui/textarea"

<FormField
  control={form.control}
  name="message"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Message</FormLabel>
      <FormControl>
        <Textarea
          placeholder="Tell us about your sustainability goals..."
          className="resize-none"
          rows={5}
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
```

**Common Patterns:**
- Use `resize-none` to prevent manual resizing
- Show character count for limited inputs
- Use appropriate `rows` for expected content length
- Always pair with label for accessibility

---

### 6. Select Component

**Purpose:** Dropdown selection for service selection, persona targeting, filters

**Dependencies:**
- `@radix-ui/react-select`

**Key Props:**
- `value`: Controlled value
- `onValueChange`: Change handler
- `disabled`: Disable select
- `placeholder`: Placeholder text

**Best Practice Example:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<FormField
  control={form.control}
  name="service"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Service Interest</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Common Patterns:**
- Use with FormField for form integration
- Always include placeholder
- Group related options when many items
- Use disabled state when appropriate

---

### 7. Checkbox Component

**Purpose:** Consent checkboxes, multi-select options, filters

**Dependencies:**
- `@radix-ui/react-checkbox`

**Key Props:**
- `checked`: Controlled checked state
- `onCheckedChange`: Change handler
- `disabled`: Disable checkbox

**Best Practice Example:**
```tsx
import { Checkbox } from "@/components/ui/checkbox"

<FormField
  control={form.control}
  name="consent"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          I agree to receive marketing communications
        </FormLabel>
        <FormDescription>
          You can unsubscribe at any time
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

**Common Patterns:**
- Use for consent/agreement checkboxes
- Always pair with descriptive label
- Use in FormField for validation
- Show clear description of what user is agreeing to

---

### 8. Label Component

**Purpose:** Form field labels for accessibility

**Dependencies:**
- `@radix-ui/react-label`

**Key Props:**
- `htmlFor`: ID of associated input
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" />
</div>

// With FormField (automatic association)
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

**Common Patterns:**
- Always use with form inputs
- Use `htmlFor` to associate with input `id`
- FormLabel automatically handles association in FormField
- Keep labels concise and descriptive

---

### 9. Dialog Component

**Purpose:** Modal windows for ROI calculators, case study details, confirmations

**Dependencies:**
- `@radix-ui/react-dialog`

**Key Props:**
- `open`: Controlled open state
- `onOpenChange`: Change handler

**Best Practice Example:**
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function ROICalculator() {
  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Calculate ROI</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ROI Calculator</DialogTitle>
          <DialogDescription>
            Calculate your potential water savings and ROI
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Calculator form */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**Common Patterns:**
- Use for focused interactions (calculators, forms, details)
- Include DialogHeader with title and description
- Make content scrollable for long content
- Close on outside click or ESC key
- Manage focus properly for accessibility

---

### 10. Tabs Component

**Purpose:** Service navigation, persona-specific content switching, tabbed content

**Dependencies:**
- `@radix-ui/react-tabs`

**Key Props:**
- `defaultValue`: Default active tab
- `value`: Controlled active tab
- `onValueChange`: Change handler

**Best Practice Example:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="ecowater" className="w-full">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="ecowater">EcoWater</TabsTrigger>
    <TabsTrigger value="ecoesg">EcoESG</TabsTrigger>
    <TabsTrigger value="ecocsr">EcoCSR</TabsTrigger>
    <TabsTrigger value="ecoimpact">EcoImpact</TabsTrigger>
  </TabsList>
  <TabsContent value="ecowater">
    <Card>
      <CardHeader>
        <CardTitle>EcoWater Solutions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  </TabsContent>
  {/* Other tabs */}
</Tabs>
```

**Common Patterns:**
- Use for switching between related content
- Keep tab labels concise
- Use grid layout for equal-width tabs
- Show active state clearly
- Support keyboard navigation

---

### 11. Accordion Component

**Purpose:** FAQ sections, expandable content, collapsible sections

**Dependencies:**
- `@radix-ui/react-accordion`

**Key Props:**
- `type`: "single" | "multiple"
- `defaultValue`: Default open items
- `value`: Controlled open items
- `onValueChange`: Change handler

**Best Practice Example:**
```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is EcoWater?</AccordionTrigger>
    <AccordionContent>
      EcoWater is our rainwater harvesting solution that helps businesses...
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How long does installation take?</AccordionTrigger>
    <AccordionContent>
      Installation typically takes 2-4 weeks depending on project size...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Common Patterns:**
- Use `type="single"` for FAQs (one open at a time)
- Use `type="multiple"` when multiple items can be open
- Keep trigger text concise (questions)
- Provide detailed content in AccordionContent
- Use for FAQ sections, feature details, expandable info

---

### 12. Badge Component

**Purpose:** Trust indicators, certifications, status labels, service categories

**Dependencies:**
- `@radix-ui/react-slot`

**Key Props:**
- `variant`: "default" | "secondary" | "destructive" | "outline"
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { Badge } from "@/components/ui/badge"

// Service category badge
<Badge variant="outline" className="mb-2">
  Water Sustainability
</Badge>

// Trust indicator
<Badge variant="default" className="bg-[#7CC95B]">
  Certified
</Badge>

// Status badge
<Badge variant="secondary">Active</Badge>
```

**Common Patterns:**
- Use for small labels and indicators
- Use outline variant for subtle badges
- Use default variant for prominent badges
- Customize colors for brand alignment
- Keep text short and concise

---

### 13. Avatar Component

**Purpose:** Team member photos, testimonial avatars, user profiles

**Dependencies:**
- `@radix-ui/react-avatar`

**Key Props:**
- `src`: Image source
- `alt`: Alt text
- `fallback`: Fallback text/icon

**Best Practice Example:**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/team/john-doe.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// In testimonial card
<div className="flex items-center gap-3">
  <Avatar>
    <AvatarImage src={testimonial.avatar} />
    <AvatarFallback>{testimonial.initials}</AvatarFallback>
  </Avatar>
  <div>
    <p className="font-semibold">{testimonial.name}</p>
    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
  </div>
</div>
```

**Common Patterns:**
- Always provide fallback for missing images
- Use initials for fallback
- Include alt text for accessibility
- Use in testimonials, team sections, user profiles

---

### 14. Skeleton Component

**Purpose:** Loading states for async content, placeholders

**Dependencies:**
- None (pure CSS component)

**Key Props:**
- `className`: Styling for size and shape

**Best Practice Example:**
```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-[200px] w-full" />
</div>

// Table skeleton
<div className="space-y-2">
  {[1, 2, 3, 4, 5].map((i) => (
    <Skeleton key={i} className="h-12 w-full" />
  ))}
</div>
```

**Common Patterns:**
- Match skeleton size to actual content
- Use multiple skeletons for complex layouts
- Show during data fetching
- Replace with actual content when loaded

---

### 15. Navigation Menu Component

**Purpose:** Multi-level navigation for services, main site navigation

**Dependencies:**
- `@radix-ui/react-navigation-menu`

**Key Props:**
- `orientation`: "horizontal" | "vertical"
- `delayDuration`: Hover delay in ms

**Best Practice Example:**
```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <li>
            <NavigationMenuLink asChild>
              <a href="/services/ecowater" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                <div className="text-sm font-medium leading-none">EcoWater</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Rainwater harvesting solutions
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {/* More items */}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Common Patterns:**
- Use for main site navigation
- Support dropdown menus for services
- Include hover states and transitions
- Make keyboard navigable
- Use grid layout for dropdown content

---

### 16. Separator Component

**Purpose:** Visual dividers between sections

**Dependencies:**
- `@radix-ui/react-separator`

**Key Props:**
- `orientation`: "horizontal" | "vertical"
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { Separator } from "@/components/ui/separator"

<div>
  <h2>Section Title</h2>
  <Separator className="my-4" />
  <p>Content below separator</p>
</div>
```

**Common Patterns:**
- Use between major sections
- Add margin for spacing
- Use horizontal for most cases
- Use vertical in sidebars or layouts

---

### 17. Table Component

**Purpose:** Data tables for metrics, comparison tables, data display

**Dependencies:**
- None (pure CSS component)

**Key Props:**
- Standard HTML table props

**Best Practice Example:**
```tsx
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableCaption>Water Savings Metrics</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead>Water Saved (L)</TableHead>
      <TableHead>Cost Savings</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell className="font-medium">{row.project}</TableCell>
        <TableCell>{row.waterSaved}</TableCell>
        <TableCell>{row.costSavings}</TableCell>
        <TableCell>
          <Badge>{row.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Common Patterns:**
- Use TableCaption for accessibility
- Include TableHeader for column labels
- Map data to TableRows
- Use Badge for status indicators
- Make responsive for mobile

---

### 18. Carousel Component

**Purpose:** Testimonial carousel, case study showcase, image galleries

**Dependencies:**
- `embla-carousel-react`

**Key Props:**
- `opts`: Embla carousel options
- `orientation`: "horizontal" | "vertical"
- `plugins`: Embla plugins

**Best Practice Example:**
```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {testimonials.map((testimonial, index) => (
      <CarouselItem key={index}>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback>{testimonial.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

**Common Patterns:**
- Use for testimonials, case studies, image galleries
- Include navigation arrows
- Show indicators for current slide
- Auto-play option for hero sections
- Make touch/swipe enabled

---

### 19. Popover Component

**Purpose:** Tooltips, help text, quick info, contextual menus

**Dependencies:**
- `@radix-ui/react-popover`

**Key Props:**
- `open`: Controlled open state
- `onOpenChange`: Change handler

**Best Practice Example:**
```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">More Info</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">Water Savings Explained</h4>
      <p className="text-sm text-muted-foreground">
        Our systems can save up to 50% of your water consumption...
      </p>
    </div>
  </PopoverContent>
</Popover>
```

**Common Patterns:**
- Use for contextual help
- Keep content concise
- Close on outside click
- Use for quick info without navigation

---

### 20. Tooltip Component

**Purpose:** Hover information, help text, field descriptions

**Dependencies:**
- `@radix-ui/react-tooltip`

**Key Props:**
- `delayDuration`: Delay before showing (ms)

**Best Practice Example:**
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">?</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This metric shows your water savings over the last quarter</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Common Patterns:**
- Use for help icons and info
- Keep tooltip text short
- Show on hover
- Use TooltipProvider at app level

---

### 21. Dropdown Menu Component

**Purpose:** Action menus, filters, sorting options, user menus

**Dependencies:**
- `@radix-ui/react-dropdown-menu`

**Key Props:**
- `open`: Controlled open state
- `onOpenChange`: Change handler

**Best Practice Example:**
```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Common Patterns:**
- Use for action menus
- Group related items with separators
- Use labels for sections
- Support keyboard navigation
- Close on selection

---

### 22. Command Component

**Purpose:** Search functionality, command palette, quick actions

**Dependencies:**
- `cmdk`

**Key Props:**
- `shouldFilter`: Enable/disable filtering
- `defaultValue`: Default search value

**Best Practice Example:**
```tsx
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Search services..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Services">
      <CommandItem>EcoWater</CommandItem>
      <CommandItem>EcoESG</CommandItem>
      <CommandItem>EcoCSR</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

**Common Patterns:**
- Use for search functionality
- Group results by category
- Show empty state
- Support keyboard navigation
- Use CommandDialog for modal search

---

### 23. Scroll Area Component

**Purpose:** Scrollable content sections with custom scrollbar

**Dependencies:**
- `@radix-ui/react-scroll-area`

**Key Props:**
- `orientation`: "horizontal" | "vertical" | "both"
- `className`: Additional styling

**Best Practice Example:**
```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[300px] w-full rounded border p-4">
  <div className="space-y-4">
    {/* Long content */}
  </div>
</ScrollArea>
```

**Common Patterns:**
- Use for custom scrollbars
- Set explicit height
- Use for sidebars, modals, long content
- Maintain consistent styling

---

### 24. Collapsible Component

**Purpose:** Expandable sections for detailed info, show more/less

**Dependencies:**
- `@radix-ui/react-collapsible`

**Key Props:**
- `open`: Controlled open state
- `onOpenChange`: Change handler
- `defaultOpen`: Default open state

**Best Practice Example:**
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Show Details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2">
    <p>Detailed information here...</p>
  </CollapsibleContent>
</Collapsible>
```

**Common Patterns:**
- Use for expandable content
- Show/hide additional details
- Animate open/close
- Use in cards, lists, details sections

---

### 25. Aspect Ratio Component

**Purpose:** Image containers for consistent sizing, responsive images

**Dependencies:**
- `@radix-ui/react-aspect-ratio`

**Key Props:**
- `ratio`: Aspect ratio (e.g., 16/9, 4/3, 1/1)

**Best Practice Example:**
```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img
    src="/hero-image.jpg"
    alt="EcoLive Solutions"
    className="h-full w-full rounded-md object-cover"
  />
</AspectRatio>
```

**Common Patterns:**
- Use for consistent image sizing
- Maintain aspect ratios
- Use in cards, galleries, hero sections
- Combine with Next.js Image component

---

### 26. Switch Component

**Purpose:** Toggle options (e.g., newsletter subscription, settings)

**Dependencies:**
- `@radix-ui/react-switch`

**Key Props:**
- `checked`: Controlled checked state
- `onCheckedChange`: Change handler
- `disabled`: Disable switch

**Best Practice Example:**
```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="newsletter" checked={subscribed} onCheckedChange={setSubscribed} />
  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
</div>
```

**Common Patterns:**
- Use for binary toggles
- Always pair with label
- Show clear on/off states
- Use in settings, preferences

---

### 27. Radio Group Component

**Purpose:** Single choice selections, options with mutually exclusive choices

**Dependencies:**
- `@radix-ui/react-radio-group`

**Key Props:**
- `value`: Controlled value
- `onValueChange`: Change handler
- `defaultValue`: Default value

**Best Practice Example:**
```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<FormField
  control={form.control}
  name="persona"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>I am a...</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compliance" id="compliance" />
            <Label htmlFor="compliance">Compliance Strategist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="operational" id="operational" />
            <Label htmlFor="operational">Operational Realist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="impact" id="impact" />
            <Label htmlFor="impact">Impact Seeker</Label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Common Patterns:**
- Use for single-choice selections
- Always pair with labels
- Use in forms for mutually exclusive options
- Group related options together

---

## Components Not Found in @shadcn Registry

The following components were mentioned in requirements but not found in the @shadcn registry. Consider alternatives:

### Alert Component
**Status:** Not found in @shadcn
**Alternatives:**
- Check @magicui or @aceternity registries
- Create custom component using Card + appropriate styling
- Use a simple div with alert styling

**Custom Implementation Suggestion:**
```tsx
// components/ui/alert.tsx
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

export function Alert({ 
  variant = "default",
  children,
  className 
}: {
  variant?: "default" | "success" | "error" | "warning" | "info"
  children: React.ReactNode
  className?: string
}) {
  const icons = {
    default: Info,
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }
  
  const Icon = icons[variant]
  
  return (
    <div className={cn(
      "rounded-lg border p-4",
      variant === "error" && "border-red-200 bg-red-50 text-red-800",
      variant === "success" && "border-green-200 bg-green-50 text-green-800",
      variant === "warning" && "border-yellow-200 bg-yellow-50 text-yellow-800",
      variant === "info" && "border-blue-200 bg-blue-50 text-blue-800",
      className
    )}>
      <div className="flex items-start gap-2">
        <Icon className="h-4 w-4 mt-0.5" />
        <div>{children}</div>
      </div>
    </div>
  )
}
```

### Progress Component
**Status:** Not found in @shadcn
**Alternatives:**
- Check @magicui or @aceternity registries
- Create custom component

**Custom Implementation Suggestion:**
```tsx
// components/ui/progress.tsx
import { cn } from "@/lib/utils"

export function Progress({ 
  value, 
  className 
}: { 
  value: number
  className?: string 
}) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}
```

### Sheet Component
**Status:** Not found in @shadcn
**Alternatives:**
- Check @magicui or @aceternity registries
- Use Dialog component as alternative
- Create custom side panel component

### Hover Card Component
**Status:** Not found in @shadcn
**Alternatives:**
- Check @magicui or @aceternity registries
- Use Popover with hover trigger
- Create custom component

### Chart Component
**Status:** Not a standard shadcn component
**Recommendation:** Use recharts or chart.js with shadcn styling

**Implementation:**
```tsx
// Install: npm install recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="waterSaved" fill="#7CC95B" />
    <Bar dataKey="costSavings" fill="#0099D5" />
  </BarChart>
</ResponsiveContainer>
```

---

## Component Integration Notes

### Form + Input Integration
- Use `FormField` to connect Input to form state
- `FormControl` wraps the input
- `FormMessage` shows validation errors
- Use react-hook-form's `control` prop
- Always include `FormLabel` for accessibility

### Card Layout Pattern
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Dialog for Modals
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Tabs for Content Switching
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Navigation Menu Structure
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Dropdown content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## State Management Needed

Based on component research, the following state will be needed:

### Form State
- **Managed by:** react-hook-form
- **Purpose:** Form validation, submission, error handling
- **Components:** All form inputs, select, checkbox, radio-group, textarea

### UI State
- **Loading State:** Boolean for async operations (API calls, form submission)
- **Error State:** String or null for error messages
- **Success State:** Boolean for successful operations
- **Dialog/Modal State:** Boolean for open/close
- **Tab State:** String for active tab
- **Accordion State:** String or array for open items
- **Carousel State:** Managed by embla-carousel-react

### Data State
- **User Input:** Form field values
- **API Data:** Fetched content (testimonials, case studies, metrics)
- **Filters:** Selected filter options
- **Search:** Search query and results

---

## Dependencies Required

```json
{
  "dependencies": {
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "embla-carousel-react": "^8.0.0",
    "cmdk": "^1.0.0",
    "recharts": "^2.10.3",
    "lucide-react": "^0.303.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

**Note:** Most Radix UI dependencies will be installed automatically when adding shadcn components. Additional dependencies like `recharts` for charts and `embla-carousel-react` for carousel need to be installed separately.

---

## Brand Color Integration

### Primary Colors (from Logo)
- **Green:** `#7CC95B` - Primary CTAs, success states, positive metrics
- **Blue:** `#0099D5` - Secondary actions, links, data visualizations

### Implementation
Customize component variants to use brand colors:

```tsx
// In tailwind.config.ts or component styling
const brandColors = {
  primary: {
    green: '#7CC95B',
    blue: '#0099D5'
  }
}

// Button with brand color
<Button className="bg-[#7CC95B] hover:bg-[#6BB04A] text-white">
  Request Consultation
</Button>

// Badge with brand color
<Badge className="bg-[#7CC95B] text-white">Certified</Badge>
```

---

## Next Steps

✓ All components researched
✓ Implementation details documented
✓ Dependencies identified
✓ Integration patterns documented
✓ Custom components noted for missing items

→ Proceed to Step 3: Build Implementation (shadcn-3-build-implementation)

---

**Part of Shadcn Website Builder Workflow**
- Step 1: Analyze Requirements ✅
- **Step 2** (Current): Research Components ✅
- Step 3: Build Implementation
- Step 4 (Express): Quick Add Single Component

