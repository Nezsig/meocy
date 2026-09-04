import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const app = express();

// ============ MIDDLEWARE ============
const allowedOrigins = [
  'https://www.meocy.com',
  'https://meocy.com',
  'https://www.meocy.vercel.app',
  process.env.FRONTEND_URL || 'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============ SUPABASE CLIENT ============
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ============ RESEND EMAIL CLIENT ============
const resend = new Resend(process.env.RESEND_API_KEY);

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ STATUS ENDPOINT ============
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ EMAIL TEMPLATES ============
const getBookingConfirmationEmail = (booking) => ({
  subject: `Booking Confirmation - MEOCY Photography Studio`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #000000; padding: 24px; text-align: center; }
        .header-logo { color: #7acc00; font-size: 20px; font-weight: 600; letter-spacing: 2px; margin: 0; }
        .content { padding: 40px 32px; }
        .checkmark { background-color: #e6f7cc; border-radius: 8px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px; }
        .status-badge { color: #7acc00; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-align: center; margin-bottom: 12px; text-transform: uppercase; }
        h1 { font-size: 28px; font-weight: 700; color: #000000; margin: 0 0 8px 0; text-align: center; }
        .greeting { font-size: 14px; color: #666666; text-align: center; margin: 16px 0 24px 0; line-height: 1.6; }
        .booking-section { background-color: #f9f9f9; border-left: 3px solid #7acc00; padding: 20px; margin: 24px 0; border-radius: 4px; }
        .booking-section-title { color: #7acc00; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 16px 0; }
        .booking-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; }
        .booking-item:last-child { border-bottom: none; }
        .booking-label { color: #666666; font-weight: 500; }
        .booking-value { color: #000000; font-weight: 600; text-align: right; }
        .next-steps { margin-top: 32px; }
        .next-steps-title { color: #7acc00; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 16px 0; }
        .step { display: flex; margin: 16px 0; font-size: 14px; }
        .step-number { background-color: #000000; color: #7acc00; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 16px; flex-shrink: 0; }
        .step-content { }
        .step-title { font-weight: 600; color: #000000; margin: 0 0 4px 0; }
        .step-desc { color: #666666; font-size: 13px; margin: 0; }
        .cta-button { display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 20px; text-align: center; }
        .footer { background-color: #000000; color: #ffffff; padding: 32px; text-align: center; font-size: 12px; }
        .footer-brand { color: #7acc00; font-weight: 600; margin-bottom: 8px; font-size: 13px; }
        .footer-info { color: #999999; margin: 4px 0; line-height: 1.6; }
        .footer-divider { color: #333333; margin: 0 4px; }
        a { color: #7acc00; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="header-logo">◾ MEOCY.STUDIO</p>
        </div>

        <div class="content">
          <div class="checkmark">✓</div>
          <p class="status-badge">Booking Request Received</p>
          <h1>Thank you, ${booking.name}!</h1>

          <p class="greeting">
            We've received your shoot request and we're excited to work with you. Here's a summary of what you sent us — we'll confirm everything within 24 hours.
          </p>

          <div class="booking-section">
            <p class="booking-section-title">Your Booking</p>
            ${booking.package_type ? `<div class="booking-item"><span class="booking-label">Package</span><span class="booking-value">${booking.package_type}</span></div>` : ''}
            ${booking.shoot_type ? `<div class="booking-item"><span class="booking-label">Shoot type</span><span class="booking-value">${booking.shoot_type}</span></div>` : ''}
            ${booking.preferred_date ? `<div class="booking-item"><span class="booking-label">Preferred date</span><span class="booking-value">${booking.preferred_date}</span></div>` : ''}
            ${booking.location ? `<div class="booking-item"><span class="booking-label">Studio</span><span class="booking-value">${booking.location}</span></div>` : ''}
            ${booking.preferred_time ? `<div class="booking-item"><span class="booking-label">Preferred time</span><span class="booking-value">${booking.preferred_time}</span></div>` : ''}
          </div>

          <div class="next-steps">
            <p class="next-steps-title">What Happens Next</p>

            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <p class="step-title">We confirm availability</p>
                <p class="step-desc">Within 24 hours, by reply to this email.</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <p class="step-title">We lock in the details</p>
                <p class="step-desc">Date, location and payment are arranged directly with you — no online payment needed.</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number" style="background-color: #7acc00; color: #000000;">3</div>
              <div class="step-content">
                <p class="step-title">Shoot day</p>
                <p class="step-desc">We show up ready — in studio or on location.</p>
              </div>
            </div>

            <a href="mailto:hello@meocy.com?subject=Re: Booking Confirmation" class="cta-button">Reply to This Email</a>
          </div>
        </div>

        <div class="footer">
          <p class="footer-brand">MEOCY · meocy.com</p>
          <p class="footer-info">Viale Renato Serra 14, 20148 Milano, Italy <span class="footer-divider">·</span> Paris, France</p>
          <p class="footer-info"><a href="mailto:hello@meocy.com">hello@meocy.com</a> <span class="footer-divider">·</span> +39 379 105 1000</p>
        </div>
      </div>
    </body>
    </html>
  `
});

const getAdminNotificationEmail = (booking) => ({
  subject: `New Booking Request - ${booking.name}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Package:</strong> ${booking.package_type || 'N/A'}</p>
      <p><strong>Shoot Type:</strong> ${booking.shoot_type || 'N/A'}</p>
      <p><strong>Location:</strong> ${booking.location || 'N/A'}</p>
      <p><strong>Preferred Date:</strong> ${booking.preferred_date || 'N/A'}</p>
      <p><strong>Preferred Time:</strong> ${booking.preferred_time || 'N/A'}</p>
      <p><strong>Special Requests:</strong> ${booking.special_requests || 'None'}</p>
      <p><strong>Booking ID:</strong> ${booking.id}</p>
    </div>
  `
});

// ============ BOOKINGS ENDPOINTS ============

// Get all booked dates
app.get('/api/booked-dates', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('preferred_date, name, email, special_requests')
      .order('preferred_date', { ascending: true });

    if (error) throw error;

    const bookedDates = data.map(booking => ({
      booking_date: booking.preferred_date,
      name: booking.name,
      email: booking.email,
      special_requests: booking.special_requests
    }));

    res.json({ booked_dates: bookedDates });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ error: 'Failed to fetch booked dates' });
  }
});

// Check if a date is booked
app.get('/api/check-date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('preferred_date', date);

    if (error) throw error;

    res.json({
      is_booked: data && data.length > 0,
      booking: data && data.length > 0 ? data[0] : null
    });
  } catch (error) {
    console.error('Error checking date:', error);
    res.status(500).json({ error: 'Failed to check date' });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single booking
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      package_type,
      shoot_type,
      location,
      preferred_date,
      preferred_time,
      special_requests,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and phone are required'
      });
    }

    // Insert booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          phone,
          package_type,
          shoot_type,
          location,
          preferred_date,
          preferred_time,
          special_requests,
          status: 'pending',
        },
      ])
      .select();

    if (error) throw error;

    const booking = data[0];

    // Send confirmation email to user
    try {
      const confirmationEmail = getBookingConfirmationEmail(booking);
      await resend.emails.send({
        from: 'MEOCY Studio <noreply@meocy.com>',
        to: email,
        ...confirmationEmail,
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    // Send admin notification
    try {
      const adminEmail = getAdminNotificationEmail(booking);
      await resend.emails.send({
        from: 'MEOCY Studio <noreply@meocy.com>',
        to: process.env.ADMIN_EMAIL || 'hello@meocy.com',
        ...adminEmail,
      });
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Booking saved successfully! We will contact you shortly.',
      data: booking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update booking status (admin)
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ MEOCY API running on port ${PORT}`);
  console.log(`📊 Using Supabase: ${process.env.SUPABASE_URL}`);
  console.log(`🎉 Ready for bookings!`);
});
