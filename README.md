# MEOCY Studio - Next.js 15 Rebuild

A modern, multilingual photography studio booking system built with Next.js 15, featuring online payment integration and real-time availability management.

## Project Overview

**Branch:** `feature/next-rebuild-payment`  
**Status:** Development (Skeleton payment - real bank integration TBD)  
**Live Site:** https://meocy.com (Express version - DO NOT MODIFY)

This is a complete rebuild of the MEOCY Studio website with:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Multilingual support (EN / IT / FR)
- Supabase integration for bookings
- Resend email notifications
- Payment processing skeleton (bank details to be added)

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Internationalization:** next-intl
- **Deployment:** Vercel

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://sqwwlfppzgkylloywzkc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Installation & Setup

### Prerequisites
- Node.js 22+
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Create .env.local with API keys
cp .env.example .env.local
# Edit .env.local and add real API keys

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server locally
npm start
```

## Features

### 1. Homepage
- Hero section with brand messaging
- Package showcase (Basic, Silver, Gold, Platinum)
- Interactive price calculator
- FAQ section
- Call-to-action banner

### 2. Booking System
- Full booking form with date/time selection
- Date picker shows booked dates (disabled)
- Automatic email to studio: `meocystudio@gmail.com`
- Confirmation email to customer
- Redirects to payment page after submission

### 3. Payment Processing
- 25% deposit requirement display
- Skeleton payment gateway (real bank integration TBD)
- Payment callback endpoint for bank integration
- Status tracking in database

### 4. Multilingual Support
- English (EN), Italian (IT), French (FR)
- Language switcher in navigation
- All content translated via `next-intl`

## API Endpoints

### POST /api/bookings
Creates a new booking and sends emails.

### GET /api/available-dates
Fetches booked dates for the date picker.

### POST/GET /api/payment/callback
Handles payment gateway redirects.

## Testing Checklist

- [ ] Homepage loads in all languages
- [ ] Booking form submits successfully
- [ ] Booking saved to Supabase
- [ ] Email sent to meocystudio@gmail.com
- [ ] Booked dates appear disabled
- [ ] Price calculator works
- [ ] Payment page processes correctly
- [ ] Mobile responsive on all screens

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

## Project Structure

```
/app                      # Next.js App Router
  /[locale]/              # Localized pages
    /page.tsx             # Homepage
    /booking/page.tsx     # Booking form
    /payment/page.tsx     # Payment processing
    /confirmation/page.tsx # Confirmation
    /layout.tsx           # Locale layout with provider
  /api/                   # API routes
    /bookings/route.ts    # Booking creation
    /available-dates/route.ts
    /payment/callback/route.ts

/components               # React components
  /Navigation.tsx         # Header
  /Hero.tsx              # Hero section
  /Packages.tsx          # Pricing
  /Calculator.tsx        # Price calculator
  /BookingForm.tsx       # Main form
  /Footer.tsx            # Footer

/lib
  /supabase.ts           # Database functions

/messages                # Translation files
  /en.json
  /it.json
  /fr.json
```

## Payment Gateway Integration (Future)

Currently, the payment flow is a skeleton. To integrate a real bank gateway:

1. Get bank API docs from your payment provider
2. Update `/api/payment/callback` to verify payments
3. Update payment page to redirect to bank gateway
4. Test with test transactions

## Support

For issues or questions:
- Email: meocystudio@gmail.com
- Review the comprehensive setup guide above

## Git Workflow

```bash
# Work on feature/next-rebuild-payment branch
git add .
git commit -m "Description"
git push origin feature/next-rebuild-payment

# Create PR, test, merge to main
```

## License

MEOCY Studio - 2024. All rights reserved.
