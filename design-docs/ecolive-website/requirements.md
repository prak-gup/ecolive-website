# Feature: EcoLive Website - Complete B2B Sustainability Platform

## User Story
As a B2B decision-maker (Compliance Strategist, Operational Realist, or Impact Seeker), I want to explore EcoLive's sustainability solutions, understand their impact metrics, and request consultations so that I can make informed decisions about ESG compliance, water sustainability, and CSR initiatives for my organization.

## Brand Context

### Target Personas
1. **Compliance Strategist (Persona 1)**: Needs data dashboards, ROI proofs, compliance checklists
2. **Operational Realist (Persona 2)**: Needs practical guides, ROI calculators, maintenance info
3. **Impact Seeker (Persona 3)**: Needs storytelling, case studies, transformation visuals

### Brand Voice
- Authoritative yet approachable
- Data-driven with human impact
- Professional, credible, solution-oriented
- Inspirational without fear-mongering

### Service Lines
- **EcoWater**: Rainwater harvesting & reuse solutions
- **EcoESG**: ESG consulting & strategy (ECHO Framework)
- **EcoCSR**: Corporate social responsibility strategy
- **EcoImpact Analytics**: ESG dashboards & reporting

### Brand Assets

#### Logo
- **File**: `/public/logo.svg`
- **Format**: SVG (scalable vector)
- **Dimensions**: 151×34px (viewBox: 0 0 151 34)
- **Colors**:
  - Primary Green: `#7CC95B` (sustainability theme)
  - Primary Blue: `#0099D5` (trust, professionalism)
- **Usage**:
  - Header: Primary navigation (left-aligned, clickable to homepage)
  - Footer: Smaller version with company info
  - Favicon: Simplified version or icon-only variant
  - Email signatures: Standard size
- **Responsive Considerations**:
  - Desktop: Full logo (151×34px)
  - Tablet: Maintain aspect ratio, scale down proportionally
  - Mobile: May use icon-only variant or scaled-down full logo
- **Accessibility**: Logo should have alt text "EcoLive" when used as image
- **Implementation Notes**:
  - Use Next.js `Image` component or direct SVG import for optimal performance
  - Create reusable `Logo` component for consistent usage across site
  - Ensure logo is clickable and links to homepage in header
  - Consider creating icon-only variant for mobile/favicon use

#### Brand Colors (from Logo)
- **Green** (`#7CC95B`): Primary brand color, sustainability, growth
- **Blue** (`#0099D5`): Secondary brand color, trust, professionalism
- **Usage Guidelines**:
  - Use green for primary CTAs, success states, positive metrics
  - Use blue for secondary actions, links, data visualizations
  - Maintain color contrast ratios for accessibility (WCAG AA)

## Components Required

### Core Layout Components
- **header** - Main navigation with logo, menu, CTA button
- **footer** - Company info, links, contact details, social media
- **navigation-menu** - Multi-level navigation for services
- **separator** - Visual dividers between sections
- **container** - Content wrapper for consistent spacing

### Hero & Landing Components
- **hero** (custom) - Hero section with headline, subheadline, CTA buttons
- **button** - Primary and secondary CTAs throughout site
- **badge** - Trust indicators, certifications, status labels
- **card** - Service cards, feature cards, stat cards
- **avatar** - Team member photos, testimonial avatars

### Content Display Components
- **tabs** - Service navigation, persona-specific content switching
- **accordion** - FAQ sections, expandable content
- **table** - Data tables for metrics, comparison tables
- **skeleton** - Loading states for async content
- **alert** - Success messages, important notices, error states

### Data Visualization Components
- **chart** - ESG metrics, water savings graphs, ROI visualizations
- **progress** - Impact metrics, project completion status
- **meter** (custom) - Water savings indicators, ESG score displays

### Form & Input Components
- **form** - Contact forms, consultation requests, lead generation
- **input** - Text inputs for forms
- **textarea** - Message fields, detailed inquiries
- **select** - Dropdowns for service selection, persona targeting
- **checkbox** - Consent checkboxes, multi-select options
- **radio-group** - Single choice selections
- **label** - Form field labels for accessibility
- **switch** - Toggle options (e.g., newsletter subscription)

### Interactive Components
- **dialog** - Modal windows for ROI calculators, case study details
- **sheet** - Side panels for mobile navigation, filters
- **popover** - Tooltips, help text, quick info
- **tooltip** - Hover information, help text
- **dropdown-menu** - Action menus, filters, sorting options
- **command** - Search functionality, command palette

### Content Sections
- **carousel** - Testimonial carousel, case study showcase
- **scroll-area** - Scrollable content sections
- **collapsible** - Expandable sections for detailed info
- **tabs** - Tabbed content for different personas/services

### Trust & Social Proof Components
- **card** - Testimonial cards, case study cards, stat cards
- **badge** - Certifications, awards, trust badges
- **avatar-group** - Client logos, team photos

### Utility Components
- **skeleton** - Loading states
- **separator** - Visual dividers
- **aspect-ratio** - Image containers for consistent sizing
- **hover-card** - Interactive preview cards

## Component Hierarchy

### Homepage Structure
```
Header
├── Logo (SVG: /public/logo.svg)
│   └── Link to homepage (clickable)
├── NavigationMenu
│   ├── Services (dropdown)
│   │   ├── EcoWater
│   │   ├── EcoESG
│   │   ├── EcoCSR
│   │   └── EcoImpact Analytics
│   ├── About
│   ├── Resources/Blog
│   └── Contact
└── Button (CTA: "Get Started" / "Request Consultation")

Hero Section
├── Heading (H1)
├── Subheading
├── Badge (Trust indicators)
├── Button Group (Primary + Secondary CTAs)
└── Image/Video

Stats Section
├── Card Grid (4 cards)
│   ├── Card
│   │   ├── Icon
│   │   ├── Number (large)
│   │   └── Label
│   └── [Repeat for 2K+ projects, 1K+ ML saved, 14+ states, etc.]

Services Overview
├── Tabs (4 service tabs)
│   ├── Tab: EcoWater
│   │   └── Card
│   │       ├── Icon
│   │       ├── Title
│   │       ├── Description
│   │       └── Button (Learn More)
│   └── [Repeat for EcoESG, EcoCSR, EcoImpact]

Impact Metrics Section
├── Chart (Water savings visualization)
├── Progress Bars (Various metrics)
└── Card (Key achievements)

Testimonials Section
├── Carousel
│   └── Card (Testimonial)
│       ├── Avatar
│       ├── Quote
│       ├── Name
│       └── Company/Title

Case Studies Section
├── Card Grid
│   └── Card (Case Study)
│       ├── Image
│       ├── Badge (Category)
│       ├── Title
│       ├── Description
│       └── Button (Read More)

CTA Section
├── Card
│   ├── Heading
│   ├── Description
│   └── Form (Quick consultation request)
│       ├── Input (Email)
│       ├── Select (Service interest)
│       └── Button (Submit)

Footer
├── Grid Layout
│   ├── Company Info
│   ├── Services Links
│   ├── Resources Links
│   └── Contact Info
├── Separator
└── Copyright
```

### Service Page Structure (EcoWater, EcoESG, EcoCSR, EcoImpact)
```
Header (same as homepage)

Hero Section
├── Badge (Service category)
├── Heading (H1: Service name)
├── Subheading
└── Button (Request Consultation)

Overview Section
├── Card
│   ├── Heading
│   ├── Description
│   └── Image

Benefits Section
├── Card Grid
│   └── Card
│       ├── Icon
│       ├── Title
│       └── Description

How It Works Section
├── Tabs (Steps or Process)
│   └── Tab Content
│       ├── Number/Step indicator
│       ├── Title
│       └── Description

Features Section
├── Accordion
│   └── AccordionItem
│       ├── AccordionTrigger
│       └── AccordionContent

Metrics/Impact Section
├── Chart (if applicable)
├── Progress indicators
└── Card (Key metrics)

FAQs Section
├── Accordion
│   └── AccordionItem
│       ├── AccordionTrigger (Question)
│       └── AccordionContent (Answer)

ROI Calculator Section (for Persona 2)
├── Card
│   ├── Form
│   │   ├── Input (Water usage)
│   │   ├── Input (Current costs)
│   │   ├── Select (Location)
│   │   └── Button (Calculate)
│   └── Alert (Results display)

Case Studies Section
├── Card Grid
│   └── Card (Relevant case studies)

Consultation Form Section
├── Card
│   └── Form
│       ├── Input (Name)
│       ├── Input (Email)
│       ├── Input (Phone)
│       ├── Select (Company)
│       ├── Select (Service interest)
│       ├── Textarea (Message)
│       ├── Checkbox (Consent)
│       └── Button (Submit)

Footer (same as homepage)
```

### About Page Structure
```
Header (same as homepage)

Hero Section
├── Heading (About EcoLive)
└── Subheading

Mission & Vision Section
├── Card Grid (2 cards)
│   ├── Card (Mission)
│   └── Card (Vision)

Values Section
├── Card Grid (4 cards)
│   └── Card
│       ├── Icon
│       ├── Title
│       └── Description

Impact Stats Section
├── Card Grid
│   └── Card (Key metrics)

Team Section (if applicable)
├── Card Grid
│   └── Card
│       ├── Avatar
│       ├── Name
│       └── Title

Footer (same as homepage)
```

## Functionality Requirements

### User Interactions

#### Homepage
1. User lands on homepage
2. Can navigate via header menu
3. Can scroll through hero, stats, services
4. Can switch between service tabs
5. Can view testimonials via carousel
6. Can click "Read More" on case studies (opens dialog or navigates)
7. Can fill quick consultation form
8. Can click service cards to navigate to service pages

#### Service Pages
1. User navigates to service page
2. Can scroll through service information
3. Can expand/collapse FAQs via accordion
4. Can use ROI calculator (Persona 2 focus)
   - Enter water usage data
   - Select location/parameters
   - Calculate savings
   - View results in alert or card
5. Can fill detailed consultation form
6. Can view related case studies
7. Can download resources (if gated content)

#### Forms
1. User fills form fields
2. Client-side validation checks:
   - Email format
   - Required fields
   - Phone number format (if applicable)
3. On submit:
   - Show loading state (skeleton or spinner)
   - Submit to API
   - Show success alert
   - Reset form
   - On error, show error alert with message

#### ROI Calculator
1. User enters data in calculator form
2. Real-time calculation (or on button click)
3. Display results in:
   - Chart (visualization)
   - Card (key metrics)
   - Alert (summary)
4. Option to download results as PDF
5. Option to request consultation with pre-filled data

### Validation Rules
- **Email**: Required, valid email format
- **Name**: Required, minimum 2 characters
- **Phone**: Optional, valid format if provided
- **Company**: Required for B2B forms
- **Message**: Optional, max 1000 characters
- **Consent checkbox**: Required for GDPR/compliance

### States to Handle
- [ ] Initial/Empty state (forms, calculators)
- [ ] Loading state (API calls, data fetching)
- [ ] Success state (form submission, calculations)
- [ ] Error state (validation errors, API errors)
- [ ] Hover states (interactive elements)
- [ ] Active states (navigation, tabs)
- [ ] Disabled states (buttons during submission)

## Accessibility Requirements
- [ ] All interactive elements keyboard navigable
- [ ] All form inputs have associated labels
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels for complex components (tabs, accordions, carousels)
- [ ] Screen reader announcements for dynamic content (alerts, form errors)
- [ ] Skip navigation link for keyboard users
- [ ] Semantic HTML structure (header, main, footer, sections)

## Design Considerations (Based on Brand Voice)

### Visual Style
- **Professional & Credible**: Clean layouts, ample whitespace
- **Data-Driven**: Prominent metrics, charts, progress indicators
- **Approachable**: Friendly icons, human imagery, warm colors
- **Impact-Focused**: Visual storytelling, before/after comparisons

### Component Styling
- Use **card** components for content containers (authoritative feel)
- Use **badge** components for trust indicators, certifications
- Use **chart** components for data visualization (Persona 1 focus)
- Use **progress** components for impact metrics
- Use **accordion** for FAQs (clean, organized)
- Use **tabs** for persona-specific content or service switching

### Color Scheme
- **Primary Green**: `#7CC95B` (from logo) - CTAs, success states, positive metrics
- **Primary Blue**: `#0099D5` (from logo) - Secondary actions, links, data visualizations
- **Neutral**: Professional grays for text and backgrounds
- **Accent**: Warm colors for special highlights (use sparingly)
- **Charts**: Distinct colors for data visualization (maintain brand colors where possible)
- **Text**: Dark grays/black for readability
- **Backgrounds**: White and light grays for clean, professional look

## Registry Verified
✓ Project configured with shadcn/ui
✓ Multiple registries available:
  - Default: https://ui.shadcn.com
  - @aceternity: https://ui.aceternity.com/registry/{name}.json
  - @magicui: https://magicui.design/r/{name}.json
  - @kibo: https://www.kibo-ui.com/r/{name}.json

## Component Installation Priority

### Phase 1: Core Layout (Essential)
1. button
2. card
3. header (custom) - **Includes logo integration from /public/logo.svg**
4. footer (custom) - **Includes logo integration**
5. navigation-menu
6. separator
7. link (for logo navigation)
8. Logo component (custom) - Reusable component for SVG logo

### Phase 2: Content Display (High Priority)
9. tabs
10. accordion
11. badge
12. avatar
13. skeleton

### Phase 3: Forms & Interactions (High Priority)
14. form
15. input
16. textarea
17. select
18. checkbox
19. label
20. alert
21. dialog

### Phase 4: Data Visualization (Medium Priority)
22. chart
23. progress
24. table

### Phase 5: Enhanced Interactions (Medium Priority)
25. carousel
26. popover
27. tooltip
28. dropdown-menu
29. sheet
30. command

### Phase 6: Utilities (Low Priority)
31. scroll-area
32. collapsible
33. aspect-ratio
34. hover-card

## Next Steps
→ Proceed to Step 2: Component Research (shadcn-2-research-components)

---

**Part of Shadcn Website Builder Workflow**
- **Step 1** (Current): Analyze Requirements ✅
- Step 2: Research Components
- Step 3: Build Implementation
- Step 4 (Express): Quick Add Single Component
