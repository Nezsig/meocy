import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

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

    res.status(201).json({
      success: true,
      message: 'Booking saved successfully! We will contact you shortly.',
      data: data[0],
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
