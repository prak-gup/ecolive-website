# Setup Instructions for EcoLive Website

This document provides step-by-step instructions for setting up and implementing the EcoLive website components.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Next.js 14+ project initialized
- Tailwind CSS configured
- shadcn/ui configured (see `components.json`)

## Step 1: Install Required shadcn Components

Run the following command to install all required shadcn components:

```bash
npx shadcn@latest add button card form input textarea select checkbox label dialog tabs accordion badge avatar skeleton navigation-menu separator table carousel popover tooltip dropdown-menu command scroll-area collapsible aspect-ratio switch radio-group
```

**Note:** Some components may need to be checked in alternative registries (@magicui, @aceternity) or require custom implementation:
- `alert` - Custom implementation provided in component-research.md
- `progress` - Custom implementation provided in component-research.md
- `sheet` - Check alternative registries or use Dialog as alternative
- `hover-card` - Check alternative registries or use Popover
- `chart` - Use recharts library (see Step 2)

## Step 2: Install Additional Dependencies

Install the required npm packages for forms, validation, and charts:

```bash
npm install react-hook-form @hookform/resolvers zod recharts embla-carousel-react cmdk
```

**Dependencies Breakdown:**
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `recharts` - Chart library for data visualization
- `embla-carousel-react` - Carousel functionality
- `cmdk` - Command palette functionality

**Note:** Most Radix UI dependencies will be installed automatically when adding shadcn components.

## Step 3: Verify Project Setup

### Check `lib/utils.ts`

Ensure your `lib/utils.ts` file contains the `cn` helper function:

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Check `app/layout.tsx`

Ensure your root layout includes the font and global styles:

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoLive - Sustainable Business Solutions",
  description: "Leading B2B sustainability platform for ESG compliance, water conservation, and corporate social responsibility.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Check `tailwind.config.ts`

Ensure your Tailwind config includes the shadcn/ui configuration:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add brand colors
        primary: {
          green: "#7CC95B",
          blue: "#0099D5",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

## Step 4: Add Custom Components

### Create Custom Alert Component

Since `alert` is not available in the default shadcn registry, create a custom component:

**File:** `components/ui/alert.tsx`

```tsx
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

interface AlertProps {
  variant?: "default" | "success" | "error" | "warning" | "info"
  children: React.ReactNode
  className?: string
}

export function Alert({ variant = "default", children, className }: AlertProps) {
  const icons = {
    default: Info,
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[variant]

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variant === "error" && "border-red-200 bg-red-50 text-red-800",
        variant === "success" && "border-green-200 bg-green-50 text-green-800",
        variant === "warning" && "border-yellow-200 bg-yellow-50 text-yellow-800",
        variant === "info" && "border-blue-200 bg-blue-50 text-blue-800",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export function AlertDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm", className)}>{children}</p>
}
```

### Create Custom Progress Component

**File:** `components/ui/progress.tsx`

```tsx
import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}
```

## Step 5: Copy Component Files

Copy all component files from the implementation to your project:

1. **Logo Component:** `components/logo.tsx`
2. **Header Component:** `components/header.tsx`
3. **Footer Component:** `components/footer.tsx`
4. **Hero Section:** `components/hero-section.tsx`
5. **Consultation Form:** `components/consultation-form.tsx`
6. **Stats Section:** `components/stats-section.tsx`
7. **Services Overview:** `components/services-overview.tsx`
8. **Testimonials Section:** `components/testimonials-section.tsx`
9. **Case Studies Section:** `components/case-studies-section.tsx`
10. **ROI Calculator:** `components/roi-calculator.tsx`

## Step 6: Create API Route for Consultation Form

Create the API route to handle form submissions:

**File:** `app/api/consultation/route.ts`**

```tsx
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.service) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // TODO: Add your backend integration here
    // Examples:
    // - Save to database (Supabase, PostgreSQL, etc.)
    // - Send email notification
    // - Create CRM entry
    // - Add to mailing list

    // For now, just log the data
    console.log("Consultation request:", body)

    return NextResponse.json(
      { message: "Consultation request received successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing consultation request:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## Step 7: Update Homepage

Update your homepage to use the new components:

**File:** `app/page.tsx`**

The homepage now includes:
- Hero Section
- Stats Section
- Services Overview (with tabs)
- Testimonials Section
- Case Studies Section
- Consultation Form

See `app/page.tsx` for the complete implementation with all sections including testimonials and case studies data.

## Step 8: Configure Next.js Image Optimization

If using the Logo component with Next.js Image, ensure your `next.config.js` is configured:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Add any remote image domains if needed
    ],
  },
}

module.exports = nextConfig
```

## Step 9: Test the Implementation

### Checklist

- [ ] All shadcn components installed successfully
- [ ] All npm dependencies installed
- [ ] Logo component displays correctly
- [ ] Header navigation works
- [ ] Footer links are correct
- [ ] Hero section displays properly
- [ ] Stats section shows all statistics
- [ ] Services tabs switch correctly
- [ ] Consultation form validation works
- [ ] Form submission shows loading state
- [ ] Success/error messages display correctly
- [ ] Testimonials section displays correctly
- [ ] Case studies cards are clickable
- [ ] ROI calculator opens and calculates correctly
- [ ] All components are responsive on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility verified

### Test Form Validation

1. Try submitting empty form - should show validation errors
2. Enter invalid email - should show email validation error
3. Enter name less than 2 characters - should show error
4. Don't check consent - should show error
5. Submit valid form - should show success message

### Test Responsive Design

1. Test on mobile (375px width)
2. Test on tablet (768px width)
3. Test on desktop (1920px width)
4. Verify navigation menu works on mobile
5. Check that all text is readable
6. Ensure buttons are easily tappable on mobile

## Step 10: Using ROI Calculator on Service Pages

The ROI Calculator component can be added to service pages for users to calculate potential savings:

**Example Usage:**

```tsx
import { ROICalculator } from "@/components/roi-calculator"

// In your service page component
<ROICalculator serviceType="ecowater" />
```

The calculator opens in a dialog and allows users to:
- Enter monthly water usage
- Enter current water costs
- Select location
- Calculate estimated savings and ROI
- Request detailed consultation with pre-filled data

## Step 11: Optional Enhancements

### Additional Components Available

- ✅ Testimonials section (implemented)
- ✅ Case studies section (implemented)
- ✅ ROI calculator dialog (implemented)
- FAQ accordion (can be added to service pages)
- Impact metrics charts (can use recharts library)

### Integrate Backend

- Connect consultation form to database (Supabase recommended)
- Add email notifications
- Create CRM integration
- Add analytics tracking

### Add Features

- Search functionality
- Blog section
- Resource downloads
- Client portal
- Live chat support

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure all shadcn components are installed
2. **TypeScript errors**: Check that all types are properly defined
3. **Styling issues**: Verify Tailwind config and globals.css
4. **Form not submitting**: Check API route is created and accessible
5. **Logo not displaying**: Verify logo.svg exists in `/public` folder

### Getting Help

- Check shadcn/ui documentation: https://ui.shadcn.com
- Review component research document for implementation details
- Check Next.js documentation for routing and API routes
- Review requirements document for component hierarchy

## Next Steps

After completing setup:

1. Customize brand colors in Tailwind config
2. Add actual content and data
3. Integrate with backend services
4. Add analytics tracking
5. Optimize for SEO
6. Add more pages (services, about, contact)
7. Implement additional features from requirements

---

**Part of Shadcn Website Builder Workflow**
- Step 1: Analyze Requirements ✅
- Step 2: Research Components ✅
- Step 3: Build Implementation ✅
- Setup Instructions (Current) ✅

