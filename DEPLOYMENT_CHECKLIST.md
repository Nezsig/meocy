# Deployment Checklist - MEOCY Photography Studio

Use this checklist to ensure everything is properly configured before deploying to production.

## Pre-Deployment (Local Testing)

- [ ] All code changes tested locally
- [ ] No console errors in browser dev tools
- [ ] No TypeScript errors: `npm run build`
- [ ] Booking form submits successfully
- [ ] Email confirmations received
- [ ] All three languages work (EN, IT, FR)
- [ ] Responsive design tested on mobile
- [ ] Dark mode tested and working
- [ ] Links to privacy and terms pages work
- [ ] No git commits with `.env.local` or secrets

## Supabase Setup

- [ ] Supabase project created
- [ ] Migration SQL executed in SQL Editor
- [ ] `bookings` table created with correct schema
- [ ] Row Level Security (RLS) enabled
- [ ] RLS policies created:
  - [ ] Insert policy for public bookings
  - [ ] Select policy for public availability
- [ ] API keys obtained:
  - [ ] `SUPABASE_URL` copied
  - [ ] `SUPABASE_ANON_KEY` (NOT service_role) copied
- [ ] Test connection with sample query

## Resend Email Setup

- [ ] Resend account created
- [ ] API key generated
- [ ] Sender email configured
  - [ ] Domain verified (if using custom domain)
  - [ ] DNS records added (DKIM, SPF, DMARC)
  - [ ] Email address verified for testing
- [ ] Test email sent successfully
- [ ] Admin email address confirmed in config

## Vercel Frontend Deployment

- [ ] Repository connected to Vercel
- [ ] Project settings configured:
  - [ ] Framework: Next.js
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `.next`
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_API_URL` = Railway API URL
- [ ] Domain configured:
  - [ ] Domain: www.meocy.com
  - [ ] DNS records updated
  - [ ] SSL certificate provisioned
- [ ] Production build tested: `npm run build && npm start`
- [ ] Preview deployment successful
- [ ] Production deployment successful

## Railway Backend Deployment

- [ ] Railway project created
- [ ] GitHub repository connected
- [ ] Build configuration set:
  - [ ] Build command: (default)
  - [ ] Start command: `node api/server.js`
- [ ] Environment variables added:
  - [ ] `PORT` = 4000
  - [ ] `NODE_ENV` = production
  - [ ] `SUPABASE_URL` = your URL
  - [ ] `SUPABASE_ANON_KEY` = your key
  - [ ] `RESEND_API_KEY` = your key
  - [ ] `ADMIN_EMAIL` = hello@meocy.com
  - [ ] `FRONTEND_URL` = https://www.meocy.com
- [ ] Deploy successful
- [ ] Health check passes: `curl https://api.meocy.com/api/status`
- [ ] Domain configured:
  - [ ] Domain: api.meocy.com
  - [ ] DNS records updated
  - [ ] SSL certificate provisioned

## Cross-Origin Testing

- [ ] CORS errors don't appear in browser console
- [ ] Booking form successfully posts to backend
- [ ] API only accepts requests from meocy.com
- [ ] Test CORS with curl:
  ```bash
  curl -H "Origin: https://www.meocy.com" \
       -H "Access-Control-Request-Method: POST" \
       https://api.meocy.com/api/bookings -v
  ```

## End-to-End Testing (Production)

- [ ] Visit https://www.meocy.com
- [ ] Navigate through all pages
- [ ] Test language switching (EN, IT, FR)
- [ ] Fill out booking form completely
- [ ] Submit booking form
- [ ] Success message appears
- [ ] Email received by admin (hello@meocy.com)
- [ ] Email received by test customer
- [ ] Check booking in Supabase dashboard
- [ ] API status check working

## Security Verification

- [ ] No hardcoded secrets in code
- [ ] Environment variables properly set in production
- [ ] CORS restricted to meocy.com only
- [ ] Database RLS policies enforced
- [ ] SSL/HTTPS working on all domains
- [ ] API key not visible in frontend code
- [ ] Supabase anonymous key is used (not service_role)
- [ ] No database schema exposed
- [ ] Error messages don't reveal system details

## Monitoring Setup

- [ ] Vercel analytics enabled
- [ ] Railway logs accessible
- [ ] Supabase monitoring active
- [ ] Uptime monitoring configured (e.g., UptimeRobot)
  - [ ] Monitor: https://www.meocy.com
  - [ ] Monitor: https://api.meocy.com/api/status
- [ ] Error tracking enabled (optional)
- [ ] Email delivery monitoring (Resend dashboard)

## Documentation

- [ ] README.md updated with production URLs
- [ ] SETUP.md has correct environment variable examples
- [ ] Deployment instructions reviewed
- [ ] Contact information accurate
- [ ] API documentation reviewed
- [ ] Database schema documented

## Post-Deployment (First Week)

- [ ] Monitor error logs daily
- [ ] Monitor API response times
- [ ] Check email delivery success rate
- [ ] Verify booking data integrity
- [ ] Test booking form under load
- [ ] Gather feedback from users
- [ ] Fix any critical issues immediately

## Rollback Plan

- [ ] Previous version saved
- [ ] Rollback procedure documented
- [ ] Database backup taken
- [ ] Know how to:
  - [ ] Revert Vercel deployment
  - [ ] Revert Railway deployment
  - [ ] Restore database backup

## Post-Launch Enhancements

After successful deployment, consider:

- [ ] Add booking confirmation page with reference number
- [ ] Implement client booking status tracking
- [ ] Add package details/prices page
- [ ] Integrate with calendar (Google Calendar, Calendly)
- [ ] Add admin dashboard for booking management
- [ ] Implement payment collection
- [ ] Add SMS notifications option
- [ ] Set up automated email reminders
- [ ] Analytics and reporting dashboard

## Maintenance Schedule

- [ ] Weekly: Review logs and errors
- [ ] Weekly: Check spam folder for emails
- [ ] Monthly: Review booking data
- [ ] Monthly: Update dependencies (`npm update`)
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance review
- [ ] Annually: Backup and disaster recovery test

## Contacts

- **Supabase Support**: https://supabase.com/support
- **Resend Support**: hello@resend.dev
- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://help.railway.app
- **Studio Contact**: hello@meocy.com

## Sign-Off

- [ ] All checklist items completed
- [ ] Lead developer approval
- [ ] Ready for production deployment

**Deployment Date:** _______________
**Deployed By:** _______________
**Notes:** _______________

---

✅ **Deployment Approved!**

For issues after deployment, see [SETUP.md](./SETUP.md) troubleshooting section.
