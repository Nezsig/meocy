# MEOCY Quick Start Guide

Get the project running locally in 5 minutes.

## Prerequisites

- Node.js 18+ (check with `node --version`)
- npm or yarn
- Text editor (VS Code recommended)

## 1. Clone & Install

```bash
git clone https://github.com/Nezsig/meocy.git
cd meocy
npm install
```

## 2. Set Up Environment

Copy the example environment file and add your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=hello@meocy.com
```

**Getting credentials:**
- **Supabase**: Sign up at https://supabase.com, create a project, find keys in Settings
- **Resend**: Sign up at https://resend.com, create API key in dashboard

## 3. Set Up Database (Optional for local dev)

Run the Supabase migration in your dashboard:
1. Go to https://app.supabase.com
2. Select your project
3. Go to SQL Editor
4. Copy content from `supabase/migrations/001_create_bookings_table.sql`
5. Execute the query

**Or skip this for frontend-only development**

## 4. Start Development Servers

**Option A: Separate Terminals (Recommended)**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run api:dev
```

**Option B: Single Command (Unix/Mac/Linux)**
```bash
chmod +x dev.sh
./dev.sh
```

## 5. Open in Browser

Visit: http://localhost:3000

You should see the MEOCY homepage with a booking form!

## 6. Test the Booking Form

1. Fill out the form with test data
2. Click "Submit Booking"
3. You should see a success message
4. Check your Supabase dashboard → Tables → bookings to see the entry

## Common Issues

### "API Connection Error"
- Make sure backend is running (`npm run api:dev`)
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Clear browser cache and reload

### "Supabase Connection Failed"
- Verify credentials in `.env.local`
- Check your Supabase project is active
- Run the migration SQL (step 3)

### "Port Already in Use"
```bash
# Find process using port 3000
lsof -i :3000
# Or port 4000
lsof -i :4000
# Kill it
kill -9 <PID>
```

### "Dependencies Installation Failed"
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- 📖 Read [SETUP.md](./SETUP.md) for detailed configuration
- 🚀 See [README.md](./README.md) for full documentation
- 💻 Start modifying components in `app/components/`
- 🌐 Add translations in `messages/`
- 📦 Deploy to Vercel and Railway (see SETUP.md)

## Useful Scripts

```bash
# Development
npm run dev           # Start Next.js frontend
npm run api:dev      # Start Express backend
npm run build        # Build for production
npm start            # Run production build

# Backend specific
npm run api:start    # Start backend (production mode)

# Code quality
npm run lint         # Run ESLint (if configured)
npm run type-check   # TypeScript check
```

## Project Structure Essentials

```
app/
├── [locale]/              # Routes like /en, /it, /fr
│   ├── page.tsx          # Homepage
│   └── privacy/page.tsx  # Privacy page
├── components/           # React components
│   ├── BookingForm.tsx   # Main booking form
│   ├── Header.tsx
│   └── Footer.tsx
└── globals.css           # Global styles

api/
└── server.js             # Express backend

messages/
├── en.json               # English translations
├── it.json               # Italian translations
└── fr.json               # French translations
```

## Tips

✅ **Use TypeScript** - Get IDE autocomplete in `app/components/`
✅ **Use Tailwind CSS** - Add styles directly to JSX
✅ **Check browser console** - Error messages appear there
✅ **Use network tab** - Debug API requests
✅ **Restart servers** - When changing environment variables

## Need Help?

- 📧 Email: hello@meocy.com
- 🐛 Issues: https://github.com/Nezsig/meocy/issues
- 📚 Docs: [SETUP.md](./SETUP.md)

## Happy Coding! 🎉
