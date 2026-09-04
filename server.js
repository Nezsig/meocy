import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const app = express();

// ============ MIDDLEWARE ============
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// ============ SUPABASE CLIENT ============
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ============ RESEND EMAIL CLIENT ============
console.log('🔧 STARTUP: Initializing Resend email client');
console.log('🔧 STARTUP: RESEND_API_KEY =', process.env.RESEND_API_KEY ? '✓ SET' : '❌ NOT SET');

const resend = new Resend(process.env.RESEND_API_KEY);

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
  console.log('📥 POST /api/bookings received');

  try {
    const {
      name,
      email,
      phone,
      package: packageType,
      shootType,
      location,
      preferredDate,
      preferredTime,
      specialRequests,
    } = req.body;

    console.log('📋 Booking data:', { name, email, phone, packageType, preferredDate });

    // Validate required fields
    if (!name || !email || !phone) {
      console.warn('⚠️ Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Name, email, and phone are required'
      });
    }

    // Insert booking into Supabase
    console.log('💾 Inserting into Supabase...');
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          phone,
          package_type: packageType,
          shoot_type: shootType,
          location: location || 'Studio',
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          special_requests: specialRequests,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('❌ Supabase insert failed:', error);
      throw error;
    }

    const booking = data[0];
    console.log('✅ Booking saved to Supabase:', booking.id);

    // SEND RESPONSE IMMEDIATELY - don't wait for email
    console.log('📤 Sending success response to client...');
    res.status(201).json({
      success: true,
      message: 'Booking request submitted! Check your email for confirmation. We\'ll contact you within 24 hours.',
      data: booking,
    });

    // Send emails ASYNCHRONOUSLY in the background (don't await, don't block response)
    console.log('📧 Starting async email sends via Resend...');

    if (process.env.RESEND_API_KEY) {
      // Inquiry email to MEOCY
      console.log('📧 Sending inquiry email via Resend...');
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'meocystudio@gmail.com',
        subject: `New Booking Inquiry from ${name}`,
        html: `
          <h2>New Booking Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Package:</strong> ${packageType}</p>
          <p><strong>Shoot Type:</strong> ${shootType}</p>
          <p><strong>Location:</strong> ${location || 'Studio'}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime}</p>
          <p><strong>Special Requests:</strong> ${specialRequests || 'None'}</p>
          <hr/>
          <p><small>Booking ID: ${booking.id}</small></p>
        `
      }).then((res) => {
        if (res.error) {
          console.error('❌ Inquiry email failed:', res.error);
        } else {
          console.log('✅ Inquiry email sent successfully. ID:', res.data?.id);
        }
      }).catch(err => {
        console.error('❌ INQUIRY EMAIL FAILED:', err.message);
      });

      // Confirmation email to customer
      console.log('📧 Sending confirmation email to:', email);
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your MEOCY Booking Request Received',
        html: `
          <h2>Thanks for your booking inquiry, ${name}!</h2>
          <p>We've received your request for a ${packageType} package shoot.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li>Date: ${preferredDate}</li>
            <li>Time: ${preferredTime}</li>
            <li>Location: ${location || 'Studio'}</li>
          </ul>
          <p>We'll confirm your booking within 24 hours. If you have questions, reply to this email.</p>
          <p>Best regards,<br/>MEOCY Studio<br/>Milan, Italy</p>
        `
      }).then((res) => {
        if (res.error) {
          console.error('❌ Confirmation email failed:', res.error);
        } else {
          console.log('✅ Confirmation email sent to:', email, 'ID:', res.data?.id);
        }
      }).catch(err => {
        console.error('❌ CONFIRMATION EMAIL FAILED:', err.message);
      });
    } else {
      console.error('❌ RESEND_API_KEY not set - emails disabled');
    }

  } catch (error) {
    console.error('❌ Booking error:', error.message);
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
