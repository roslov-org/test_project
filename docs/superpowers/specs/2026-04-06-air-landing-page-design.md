# Premium Pure Air — Landing Page Design

## Overview

A single-page sales landing page for a premium air product. The page serves as a product showcase with multiple contact channels. Built as a static HTML/CSS page, deployed via Lessly.

**Target audience:** International, English-speaking customers.
**Visual style:** Eco/nature theme — greens, whites, soft beige. Clean, modern, trustworthy.

## Technology

- Single `index.html` file with embedded CSS (no external dependencies except Google Fonts)
- Fully responsive (mobile-first)
- No JavaScript frameworks; vanilla JS only for form handling and smooth scroll
- Google Fonts: Poppins (headings) + Inter or system font (body)
- Deploy via Lessly

## Page Structure

### 1. Navigation Bar
- Fixed top bar, transparent on scroll-top, white on scroll
- Logo/brand name "PureAir" on left
- Anchor links: About, Products, Benefits, Contact
- Mobile: hamburger menu

### 2. Hero Section
- Full-viewport background image (nature/mountains/forest)
- Semi-transparent dark overlay for text contrast
- Heading: "Breathe the Difference"
- Subheading: "Premium pure air, sourced from the world's cleanest environments"
- CTA button: "Explore Our Air" (scrolls to Products)

### 3. About Section
- Two-column layout: text left, image right
- Brief story: what makes this air special, sourcing, quality
- Key stats (e.g., "99.99% Pure", "Sourced from 3000m+", "Hand-sealed freshness")

### 4. Products Section
- Heading: "Choose Your Volume"
- 3 product cards in a row (stacks on mobile):
  - **Starter** — 1L canister, price, short description
  - **Classic** — 5L canister, "Most Popular" badge, price, description
  - **Bulk** — 10L canister, price, description
- Each card has a "Contact Us" button that scrolls to contact form
- Prices are placeholder text to be filled by the owner

### 5. Benefits Section
- Heading: "Why Choose PureAir"
- 4 benefit cards in a grid (2x2 on mobile):
  - 100% Natural — no chemicals or additives
  - Lab Tested — certified purity levels
  - Eco Packaging — sustainable, recyclable containers
  - Fast Shipping — worldwide delivery

### 6. Testimonials Section
- Heading: "What Our Customers Say"
- 3 testimonial cards with quote, name, and location
- Placeholder text to be customized by owner

### 7. Contact Section
- Heading: "Get in Touch"
- Two-column layout:
  - **Left:** Contact form (Name, Email, Phone, Message, Submit button)
  - **Right:** Direct contact options:
    - WhatsApp button (opens wa.me link)
    - Telegram button (opens t.me link)
    - Phone number with click-to-call
- Form uses `mailto:` action or a simple form service (Formspree/Getform) — no backend needed

### 8. Footer
- Brand name, copyright 2026
- Quick links: About, Products, Contact
- Social media icon links (placeholders)

## Visual Design

### Color Palette
- Primary green: `#2d6a4f`
- Light green: `#52b788`
- Accent green: `#95d5b2`
- Background: `#fefae0` (warm beige) / `#ffffff`
- Text: `#1b1b1b` (near-black)
- Text secondary: `#6c757d`

### Typography
- Headings: Poppins, 600/700 weight
- Body: system font stack or Inter, 400 weight
- Sizes: responsive with clamp() for fluid scaling

### Imagery
- CSS gradients and SVG decorations instead of heavy images
- Hero background: placeholder image URL (owner can replace)
- Product cards: simple geometric/icon illustrations via CSS or inline SVG

### Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full layout)

## File Structure

```
test_project/
  index.html          # Single HTML file with embedded CSS and minimal JS
```

One file. No build step. No dependencies (except CDN font link).

## Form Handling

The contact form will use a `mailto:` fallback and optionally integrate with a free form service like Formspree. The owner will need to:
1. Replace the placeholder email/phone/messenger links with real ones
2. Optionally sign up for Formspree (free tier) for proper form submissions

## Deployment

Deploy as a static site via Lessly using the available MCP tools:
1. Create a Lessly project
2. Deploy the `index.html` file

## Customization Points (for the owner)

After the page is created, the owner needs to fill in:
- Product prices
- WhatsApp number / Telegram username
- Phone number
- Email address
- Testimonial quotes (or remove section)
- Hero background image (or keep CSS gradient)

## Verification

1. Open `index.html` locally in a browser to verify appearance
2. Test responsiveness at different viewport sizes
3. Verify all anchor links scroll correctly
4. Verify contact buttons have correct href formats (tel:, mailto:, wa.me, t.me)
5. Deploy to Lessly and verify the live URL loads correctly
