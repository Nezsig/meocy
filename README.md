# MEOCY Studio — Photography Booking

A professional photography studio booking website for MEOCY Studio in Milan.

## Features

### Simple Booking Form
- Customer booking requests with date/time selection
- Multiple package options (Basic, Silver, Gold, Platinum)
- Date conflict prevention (books display availability)
- Email submission via mailto:

### Booking Workflow
1. Customer fills out booking form on homepage
2. Selects their preferred date, time, and package
3. Form prevents double-booking of dates
4. Clicking "Book" opens default email client with pre-filled booking request
5. Email is sent to hello@meocy.com
6. Studio receives request and confirms via email/WhatsApp within 24 hours

## Setup

This is a static website with no backend server or database required.

### Deployment

The site is deployed to Vercel and serves as a static HTML/CSS/JavaScript website.

Simply push changes to the repository and Vercel will automatically deploy them.


## How It Works

### Customer Booking Process
1. Customer visits meocy.vercel.app
2. Selects their preferred date, time, and package
3. Fills in contact information (name, email, phone)
4. Clicks "Book Now"
5. Default email client opens with pre-filled booking request
6. Email is sent to hello@meocy.com

### Date Management
- Each booked date is stored in the browser's localStorage
- Users cannot select a date that's already booked
- Prevents double-booking without requiring a backend database

### Studio Workflow
- Studio receives booking email
- Contacts customer within 24 hours via email or WhatsApp
- Confirms availability and discusses details
- Sends payment information if needed

## Files Structure

```
meocy/
├── public/
│   ├── index.html        # Homepage with booking form
│   ├── work.html         # Portfolio page
│   ├── privacy.html      # Privacy policy
│   ├── terms.html        # Terms of service
│   ├── styles.css        # Global styles
│   └── assets/           # Images and logos
└── README.md            # This file
```

## Language Support

The website supports English, Italian, and French with a language switcher in the navigation.

## Contact

For technical questions or support:
- Email: hello@meocy.com
- Phone: +39 379 105 1000
