# MEOCY Photography Studio

A modern, multi-language photography studio booking website built with Next.js, Supabase, and Resend.

## Features

✨ **Modern Tech Stack**
- Next.js 15 with App Router
- Tailwind CSS for responsive design
- TypeScript for type safety
- Server-side rendering (SSR)

📚 **Multi-Language Support**
- English (EN), Italian (IT), French (FR)
- Dynamic routing with next-intl
- Language switcher in header and footer

📝 **Professional Booking System**
- Real-time booking form with validation
- Email confirmations to users
- Admin notifications to hello@meocy.com
- Database storage in Supabase
- Package selection (Starter, Professional, Premium)
- Special requests field

🔒 **Security & Performance**
- CORS protection (Vercel domain only)
- Row Level Security (RLS) on database
- Auto-scaling infrastructure
- SSL certificates (auto-issued)
- Health check endpoint

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your credentials
cp .env.example .env.local
# Edit .env.local with Supabase and Resend keys

# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend API
npm run api:dev
```

Visit `http://localhost:3000`

### Deployment

See [SETUP.md](./SETUP.md) for comprehensive deployment instructions:
- **Frontend**: Vercel (automatic on push to main)
- **Backend**: Railway (Node.js Express)
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend

## Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (Next.js)                  │
│         Deployed on Vercel                  │
│  - App Router (/[locale]/...)               │
│  - Components (Header, Hero, Booking...)    │
│  - Tailwind CSS styling                     │
└──────────────┬──────────────────────────────┘
               │ CORS-protected API calls
               ↓
┌─────────────────────────────────────────────┐
│     Backend API (Express)                   │
│     Deployed on Railway                     │
│  - POST /api/bookings                       │
│  - GET /api/status                          │
│  - Email integration (Resend)               │
└──────────────┬──────────────────────────────┘
               │ SQL queries
               ↓
┌─────────────────────────────────────────────┐
│    Database (Supabase/PostgreSQL)           │
│  - bookings table                           │
│  - Row Level Security (RLS) enabled         │
└─────────────────────────────────────────────┘
```

## Project Structure

```
meocy/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Homepage
│   │   ├── privacy/page.tsx   # Privacy policy
│   │   └── terms/page.tsx     # Terms page
│   ├── components/            # React components
│   │   ├── BookingForm.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── globals.css            # Global Tailwind styles
│   └── layout.tsx             # Root layout
├── api/
│   └── server.js              # Express backend
├── messages/                  # i18n translations
│   ├── en.json
│   ├── it.json
│   └── fr.json
├── supabase/
│   └── migrations/
│       └── 001_create_bookings_table.sql
├── middleware.ts              # i18n routing middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── SETUP.md                   # Detailed setup guide
```

## API Endpoints

### Booking Management
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id` - Update booking status

### Health & Monitoring
- `GET /api/status` - Health check
- `GET /health` - Legacy health endpoint

## Environment Variables

```env
# Frontend
NEXT_PUBLIC_API_URL=https://api.meocy.com

# Backend
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=hello@meocy.com
FRONTEND_URL=https://www.meocy.com
```

See [.env.example](./.env.example) for all available options.

## Database Schema

The `bookings` table stores all booking requests:

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Auto-generated primary key |
| created_at | TIMESTAMP | Auto-set on insert |
| name | TEXT | Customer name (required) |
| email | TEXT | Customer email (required) |
| phone | TEXT | Customer phone (required) |
| package_type | TEXT | Starter/Professional/Premium |
| shoot_type | TEXT | Product/Fashion/Restaurant/Model |
| location | TEXT | Shoot location |
| preferred_date | DATE | Requested date |
| preferred_time | TIME | Requested time |
| special_requests | TEXT | Notes |
| status | TEXT | pending/confirmed/completed/cancelled |

## Email Templates

The booking form sends two emails:

1. **User Confirmation** - Confirms their booking request details
2. **Admin Notification** - Alerts hello@meocy.com about new bookings

Emails are sent via Resend with professional HTML formatting.

## Security

- ✅ CORS restricted to www.meocy.com only
- ✅ Row Level Security (RLS) on database
- ✅ Input validation on all forms
- ✅ No sensitive data in git (use environment variables)
- ✅ SSL/TLS certificates auto-issued
- ✅ Rate limiting (implemented on Railway)

## Maintenance

### Monitoring
- Check API health: `curl https://api.meocy.com/api/status`
- Review logs in Vercel and Railway dashboards
- Monitor Supabase usage and performance

### Backups
```bash
# Backup database
npx supabase db pull

# Export bookings as CSV
# (Available in Supabase dashboard)
```

### Updates
```bash
# Update dependencies
npm update

# Rebuild and deploy
git push origin main
```

## Troubleshooting

### Booking form not submitting
- Check API URL in `.env.local`
- Verify backend is running on correct port
- Check browser console for CORS errors

### Emails not sending
- Verify Resend API key is valid
- Check email domain is verified in Resend
- Review Resend dashboard delivery status

### Database connection issues
- Verify Supabase credentials in environment
- Check Row Level Security policies
- Review Supabase logs for errors

## Support

For issues or questions:
- 📧 Email: hello@meocy.com
- 🐛 GitHub Issues: https://github.com/Nezsig/meocy/issues
- 📖 Documentation: See [SETUP.md](./SETUP.md)

## License

© 2024 MEOCY Photography Studio. All rights reserved.
