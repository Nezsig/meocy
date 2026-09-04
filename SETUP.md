# MEOCY Photography Studio - Setup Guide

Complete setup instructions for deploying the MEOCY Photography Studio website.

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (https://supabase.com)
- Resend account for email (https://resend.com)
- Vercel account for frontend (https://vercel.com)
- Railway account for backend (https://railway.app)
- GitHub account and repository access

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nezsig/meocy.git
cd meocy
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Resend Email Service
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=hello@meocy.com

# Backend Server
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Create a new Supabase project at https://app.supabase.com
2. Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from project settings
3. Run the migration SQL to create the `bookings` table:
   - Navigate to SQL Editor in Supabase dashboard
   - Copy and paste the content from `supabase/migrations/001_create_bookings_table.sql`
   - Execute the query

**Alternatively, use Supabase CLI:**

```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

### 4. Set Up Resend Email Service

**CRITICAL: Domain Authentication (Prevents Spam Filtering)**

Booking emails MUST come from a verified domain to avoid being marked as spam in Gmail/Outlook.

1. **Sign up at https://resend.com**

2. **Create an API key** in Resend dashboard

3. **Add Domain to Resend:**
   - Go to Resend Dashboard → Domains
   - Click "Add New Domain"
   - Enter: `meocy.com`
   - Resend will provide DNS records (DKIM, SPF, DMARC)

4. **Add DNS Records to Your Domain Registrar:**
   - Copy the DKIM record from Resend
   - Copy the SPF record from Resend
   - Copy the DMARC record from Resend
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these records to your DNS settings
   - **Wait 10-30 minutes for DNS propagation**

5. **Verify Domain in Resend:**
   - Once DNS records are added, click "Verify" in Resend
   - Status should change to ✅ Verified
   - Now emails will be sent FROM your domain, not Resend's

6. **Update Backend Code:**
   - In `api/server.js`, the email sender is already set to:
     ```javascript
     from: 'noreply@meocy.com'  // or hello@meocy.com
     ```
   - This matches your verified domain

7. **Add to Environment Variables:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

**Without domain verification, booking emails will be spam-filtered by Gmail/Outlook.**

### 5. Run Development Servers

**Terminal 1 - Frontend (Next.js)**
```bash
npm run dev
```
Frontend runs at `http://localhost:3000`

**Terminal 2 - Backend (Express API)**
```bash
npm run api:dev
```
Backend API runs at `http://localhost:4000`

Visit `http://localhost:3000` in your browser.

## Deployment

### Vercel (Frontend)

1. **Connect Repository**
   - Go to https://vercel.com
   - Import the GitHub repository
   - Select `main` or your deployment branch

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-api-domain.railway.app
     ```

3. **Deploy**
   - Vercel automatically deploys on push to main
   - Your site is available at `www.meocy.com`

### Railway (Backend API)

1. **Create Railway Project**
   - Go to https://railway.app
   - Create new project
   - Connect GitHub repository

2. **Configure Build & Start Commands**
   - Build: (leave empty for Node.js default)
   - Start: `node api/server.js`

3. **Add Environment Variables**
   In Railway dashboard, add:
   ```
   PORT=4000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   RESEND_API_KEY=your-resend-api-key
   ADMIN_EMAIL=hello@meocy.com
   FRONTEND_URL=https://www.meocy.com
   NODE_ENV=production
   ```

4. **Domain Configuration**
   - In Railway settings, add custom domain
   - Point `api.meocy.com` to Railway deployment
   - Update `NEXT_PUBLIC_API_URL` in Vercel to match

### Supabase (Database)

Database is hosted on Supabase and auto-scales.

**Backup:**
```bash
npx supabase db pull
```

### Email Domain Setup (Resend)

For production emails with your domain:

1. Add domain in Resend dashboard
2. Add DNS records (DKIM, SPF, DMARC)
3. Verify domain
4. Update email from address to `noreply@meocy.com`

## Database Schema

### bookings table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |
| name | TEXT | Client name |
| email | TEXT | Client email |
| phone | TEXT | Phone number |
| package_type | TEXT | Package selected (Starter/Professional/Premium) |
| shoot_type | TEXT | Type of shoot (Product/Fashion/Restaurant/Model) |
| location | TEXT | Shoot location |
| preferred_date | DATE | Requested date |
| preferred_time | TIME | Requested time |
| special_requests | TEXT | Additional notes |
| status | TEXT | Booking status (pending/confirmed/completed/cancelled) |

## API Endpoints

### POST /api/bookings
Create a new booking request

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "package_type": "Professional",
  "shoot_type": "Fashion",
  "location": "Milan",
  "preferred_date": "2024-09-15",
  "preferred_time": "14:30",
  "special_requests": "Include makeup artist"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking saved successfully!",
  "data": { /* booking object */ }
}
```

### GET /api/bookings
Get all bookings (admin/internal use)

### GET /api/bookings/:id
Get single booking details

### PATCH /api/bookings/:id
Update booking status (admin)

### GET /api/status
Health check endpoint

## Monitoring & Troubleshooting

### Check API Health
```bash
curl https://api.meocy.com/api/status
```

### View Server Logs
- **Vercel**: Deployments → Logs tab
- **Railway**: Deployment → Logs tab

### Database Issues
- Check Supabase dashboard → Logs
- Verify API key permissions
- Check Row Level Security (RLS) policies

### Email Not Sending or Marked as Spam

**Step 1: Check Resend Dashboard**
- Go to https://resend.com → Logs
- Look for failed or rejected emails
- Check the error message for specific issues

**Step 2: Verify Domain Authentication**
- Domains → Check if `meocy.com` status is ✅ Verified
- If not verified:
  - Ensure DNS records (DKIM, SPF, DMARC) are added to registrar
  - Wait 10-30 minutes for propagation
  - Click "Verify" button again
- **Without verification, emails go to spam**

**Step 3: Verify Environment Variables**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx  # Check it's correct
ADMIN_EMAIL=hello@meocy.com       # Check spelling
```

**Step 4: Check Email Server (api/server.js)**
- Verify sender is set to your domain:
  ```javascript
  from: 'noreply@meocy.com'  // Must match verified domain
  ```
- If using different email, update it

**Step 5: Test Email Delivery**
```bash
# Use Resend's test endpoint
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "noreply@meocy.com",
    "to": "your-email@gmail.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

**Step 6: Check Spam Folder**
- If email arrives but in spam:
  - Verify domain authentication (most common issue)
  - Mark email as "Not Spam" in Gmail/Outlook
  - This trains their filters

**Common Issues:**
| Issue | Solution |
|-------|----------|
| "Domain not verified" | Add DNS records + verify in Resend |
| Emails in spam folder | Verify domain is authenticated |
| API key error | Check RESEND_API_KEY is correct |
| "Invalid from address" | From address must match verified domain |
| Slow delivery | Check Resend logs, may have rate limit |

## Security Checklist

- [ ] CORS configured to allow only Vercel domain
- [ ] Environment variables set in both Vercel and Railway
- [ ] Database Row Level Security enabled
- [ ] Email domain verified in Resend
- [ ] SSL certificates auto-issued (Vercel/Railway handles this)
- [ ] No API keys in git repository
- [ ] Admin email address protected

## Maintenance

### Regular Tasks
- Monitor booking submissions
- Archive old bookings (6+ months)
- Review server logs weekly
- Update dependencies: `npm update`

### Database Cleanup
```bash
DELETE FROM bookings WHERE status = 'cancelled' AND created_at < NOW() - INTERVAL '1 year';
```

## Support

For issues or questions:
- Email: hello@meocy.com
- GitHub Issues: https://github.com/Nezsig/meocy/issues
