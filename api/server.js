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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your booking request!</h2>
      <p>Dear ${booking.name},</p>
      <p>We have received your booking request and will contact you shortly to confirm the details.</p>
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>Your Booking Details:</h3>
        <p><strong>Package:</strong> ${booking.package_type || 'N/A'}</p>
        <p><strong>Shoot Type:</strong> ${booking.shoot_type || 'N/A'}</p>
        <p><strong>Location:</strong> ${booking.location || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${booking.preferred_date || 'N/A'}</p>
        <p><strong>Preferred Time:</strong> ${booking.preferred_time || 'N/A'}</p>
        <p><strong>Special Requests:</strong> ${booking.special_requests || 'None'}</p>
      </div>
      <p>We look forward to working with you!</p>
      <p>Best regards,<br>MEOCY Photography Studio</p>
      <p style="font-size: 12px; color: #999; margin-top: 30px;">
        <a href="https://www.meocy.com" style="color: #999; text-decoration: none;">www.meocy.com</a>
      </p>
    </div>
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
