# MEOCY Studio — Booking System

A professional photography studio booking system with payment withholding management.

## Features

### Booking System
- Customer booking requests with date/time selection
- Multiple package options (Basic, Silver, Gold, Platinum)
- Custom subscription packages
- Booking confirmation and tracking

### Payment Withholding
The system implements a phased payment withholding approach:

1. **First Day Booking**: 25% of total price is withheld
2. **Remaining Days**: 50% of total price is withheld
3. **Final Release**: 25% is released after completion

Example for €100 booking:
- First day: €25 withheld
- Remaining days: €50 withheld
- After completion: €25 released

### Cancellation Policy
- Customers can cancel bookings **within 24 hours** of the first booking day
- Cancellation reverses all withholdings immediately
- After the cancellation window closes, bookings cannot be cancelled
- Cannot change dates without cancelling first

### User Dashboard
- View all bookings by email
- Track payment status
- Cancel bookings (if within window)
- View payment breakdown
- Copy booking IDs

## Setup

### Requirements
- Node.js 16+
- npm

### Installation

```bash
npm install
```

### Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on port 3000 (or PORT environment variable).

## API Endpoints

### Create Booking
```
POST /api/bookings
```

Request body:
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+39 123 456 7890",
  "package": "gold",
  "shoot_type": "outdoor",
  "location": "Milano, Italy",
  "booking_date": "2026-10-15",
  "booking_time": "10:00",
  "special_requests": "Additional details...",
  "total_price": 500
}
```

Response:
```json
{
  "success": true,
  "booking_id": "uuid",
  "payment_breakdown": {
    "total_price": 500,
    "first_day_withheld": 125,
    "remaining_days_withheld": 250,
    "final_release": 125,
    "can_cancel_until": "2026-10-16"
  }
}
```

### Get Booking Details
```
GET /api/bookings/:booking_id
```

### Get Customer Bookings
```
GET /api/bookings/customer/:email
```

### Cancel Booking
```
POST /api/bookings/:booking_id/cancel
```

Response:
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "refunded_amount": 125
}
```

### Mark Booking as Completed
```
POST /api/bookings/:booking_id/mark-completed
```

Response:
```json
{
  "success": true,
  "message": "Booking marked as completed",
  "final_payment_released": 125
}
```

## Database Schema

### bookings table
- `id`: Booking UUID
- `customer_name`: Customer name
- `customer_email`: Customer email
- `customer_phone`: Customer phone
- `package`: Package type
- `shoot_type`: Type of shoot
- `location`: Booking location
- `booking_date`: Scheduled date
- `booking_time`: Scheduled time
- `special_requests`: Special notes
- `total_price`: Total booking price
- `first_day_withheld`: 25% of total
- `remaining_days_withheld`: 50% of total
- `final_release`: 25% of total
- `payment_status`: pending/completed
- `can_cancel_until`: Last cancellation date
- `is_cancelled`: Boolean
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### booking_payment_history table
- `id`: Transaction UUID
- `booking_id`: Reference to booking
- `transaction_type`: withheld/reversed/released
- `amount`: Transaction amount
- `transaction_date`: When it occurred
- `description`: Transaction description

## User Flow

### Booking a Shoot
1. Customer fills out booking form on homepage
2. System creates booking and calculates withholding
3. Customer receives booking ID and confirmation
4. First day amount (25%) is withheld

### Managing Booking
1. Customer visits dashboard at `/dashboard.html`
2. Enters their email to view bookings
3. Can view payment status and breakdown
4. Can cancel (if within 24-hour window)
5. Cancellation reverses first day withholding

### Completing a Shoot
1. Admin marks booking as completed
2. Final 25% payment is released

## Files Structure

```
meocy/
├── server.js              # Express server and API
├── package.json           # Dependencies
├── .gitignore            # Git ignore rules
├── public/
│   ├── index.html        # Homepage with booking form
│   ├── dashboard.html    # Booking management dashboard
│   ├── work.html         # Portfolio page
│   ├── privacy.html      # Privacy policy
│   ├── terms.html        # Terms of service
│   ├── styles.css        # Global styles
│   └── assets/           # Images and logos
└── bookings.db          # SQLite database (auto-created)
```

## Environment Variables

Optional configuration:
- `PORT`: Server port (default: 3000)

## Security Notes

- All prices are calculated server-side
- Cancellation window is validated server-side
- Database queries use parameterized statements (SQLite prepared statements)
- CORS enabled for development

## Future Enhancements

- Email notifications for bookings
- Payment gateway integration (Stripe, PayPal)
- Admin dashboard for managing bookings
- Automatic status updates
- SMS notifications
- Google Calendar integration
