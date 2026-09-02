import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let db;

function initializeDatabase() {
  const dbPath = join(__dirname, 'bookings.db');
  db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      package TEXT NOT NULL,
      shoot_type TEXT,
      location TEXT,
      booking_date DATE NOT NULL,
      booking_time TEXT,
      photos_count INTEGER DEFAULT 0,
      videos_count INTEGER DEFAULT 0,
      special_requests TEXT,
      total_price REAL,
      payment_status TEXT DEFAULT 'pending',
      delivery_date DATE,
      delivery_time TEXT,
      is_cancelled BOOLEAN DEFAULT 0,
      cancellation_reason TEXT,
      can_cancel_until DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS booked_dates (
      id TEXT PRIMARY KEY,
      booking_date DATE NOT NULL UNIQUE,
      booking_id TEXT NOT NULL,
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );

    CREATE TABLE IF NOT EXISTS order_history (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );
  `);
}

// Get all bookings (admin dashboard)
app.get('/api/admin/bookings', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM bookings ORDER BY booking_date ASC
    `);
    const bookings = stmt.all();
    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get single booking details
app.get('/api/bookings/:booking_id', (req, res) => {
  try {
    const { booking_id } = req.params;
    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(booking_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const historyStmt = db.prepare('SELECT * FROM order_history WHERE booking_id = ? ORDER BY timestamp DESC');
    const history = historyStmt.all(booking_id);

    res.json({ booking, history });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      package: packageType,
      shoot_type,
      location,
      booking_date,
      booking_time,
      photos_count,
      videos_count,
      special_requests,
      total_price
    } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !packageType || !booking_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking_id = uuidv4();
    const order_number = `ORD-${Date.now()}`;

    const bookingDate = new Date(booking_date);
    const canCancelUntil = new Date(bookingDate);
    canCancelUntil.setDate(canCancelUntil.getDate() + 1);

    const stmt = db.prepare(`
      INSERT INTO bookings (
        id, order_number, customer_name, customer_email, customer_phone,
        package, shoot_type, location, booking_date, booking_time,
        photos_count, videos_count, special_requests, total_price, can_cancel_until
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      booking_id, order_number, customer_name, customer_email, customer_phone,
      packageType, shoot_type || null, location || null, booking_date, booking_time || null,
      photos_count || 0, videos_count || 0, special_requests || null, total_price || 0,
      canCancelUntil.toISOString().split('T')[0]
    );

    // Mark date as booked
    const dateStmt = db.prepare('INSERT INTO booked_dates (id, booking_date, booking_id) VALUES (?, ?, ?)');
    dateStmt.run(uuidv4(), booking_date, booking_id);

    // Record in history
    const historyStmt = db.prepare('INSERT INTO order_history (id, booking_id, action, details) VALUES (?, ?, ?, ?)');
    historyStmt.run(uuidv4(), booking_id, 'created', 'Booking created');

    res.json({
      success: true,
      booking_id,
      order_number,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get booked dates
app.get('/api/booked-dates', (req, res) => {
  try {
    const stmt = db.prepare('SELECT booking_date FROM booked_dates ORDER BY booking_date ASC');
    const dates = stmt.all();
    res.json({ booked_dates: dates });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ error: 'Failed to fetch booked dates' });
  }
});

// Check if date is booked
app.get('/api/check-date/:date', (req, res) => {
  try {
    const { date } = req.params;
    const stmt = db.prepare('SELECT booking_id FROM booked_dates WHERE booking_date = ?');
    const result = stmt.get(date);

    res.json({ is_booked: !!result });
  } catch (error) {
    console.error('Error checking date:', error);
    res.status(500).json({ error: 'Failed to check date' });
  }
});

// Update payment status
app.post('/api/admin/update-payment', (req, res) => {
  try {
    const { booking_id, payment_status } = req.body;

    if (!booking_id || !payment_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare('UPDATE bookings SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(payment_status, booking_id);

    const historyStmt = db.prepare('INSERT INTO order_history (id, booking_id, action, details) VALUES (?, ?, ?, ?)');
    historyStmt.run(uuidv4(), booking_id, 'payment_updated', `Payment status changed to ${payment_status}`);

    res.json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// Update delivery info
app.post('/api/admin/update-delivery', (req, res) => {
  try {
    const { booking_id, delivery_date, delivery_time } = req.body;

    if (!booking_id) {
      return res.status(400).json({ error: 'booking_id is required' });
    }

    const stmt = db.prepare('UPDATE bookings SET delivery_date = ?, delivery_time = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(delivery_date || null, delivery_time || null, booking_id);

    const historyStmt = db.prepare('INSERT INTO order_history (id, booking_id, action, details) VALUES (?, ?, ?, ?)');
    historyStmt.run(uuidv4(), booking_id, 'delivery_updated', `Delivery set to ${delivery_date} at ${delivery_time}`);

    res.json({ success: true, message: 'Delivery info updated' });
  } catch (error) {
    console.error('Error updating delivery:', error);
    res.status(500).json({ error: 'Failed to update delivery' });
  }
});

// Cancel booking
app.post('/api/admin/cancel-booking', (req, res) => {
  try {
    const { booking_id, reason } = req.body;

    if (!booking_id) {
      return res.status(400).json({ error: 'booking_id is required' });
    }

    const stmt = db.prepare('UPDATE bookings SET is_cancelled = 1, cancellation_reason = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(reason || null, booking_id);

    const historyStmt = db.prepare('INSERT INTO order_history (id, booking_id, action, details) VALUES (?, ?, ?, ?)');
    historyStmt.run(uuidv4(), booking_id, 'cancelled', `Booking cancelled. Reason: ${reason || 'No reason provided'}`);

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Change booking date
app.post('/api/admin/change-date', (req, res) => {
  try {
    const { booking_id, new_date } = req.body;

    if (!booking_id || !new_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = db.prepare('SELECT booking_date FROM bookings WHERE id = ?').get(booking_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if new date is already booked
    const existingDate = db.prepare('SELECT * FROM booked_dates WHERE booking_date = ?').get(new_date);
    if (existingDate) {
      return res.status(400).json({ error: 'New date is already booked' });
    }

    // Remove old date from booked_dates
    db.prepare('DELETE FROM booked_dates WHERE booking_date = ? AND booking_id = ?').run(booking.booking_date, booking_id);

    // Add new date
    db.prepare('INSERT INTO booked_dates (id, booking_date, booking_id) VALUES (?, ?, ?)').run(uuidv4(), new_date, booking_id);

    // Update booking
    db.prepare('UPDATE bookings SET booking_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(new_date, booking_id);

    // Record in history
    db.prepare('INSERT INTO order_history (id, booking_id, action, details) VALUES (?, ?, ?, ?)').run(
      uuidv4(), booking_id, 'date_changed', `Booking date changed from ${booking.booking_date} to ${new_date}`
    );

    res.json({ success: true, message: 'Booking date changed' });
  } catch (error) {
    console.error('Error changing date:', error);
    res.status(500).json({ error: 'Failed to change date' });
  }
});

const PORT = process.env.PORT || 3000;
initializeDatabase();

app.listen(PORT, () => {
  console.log(`MEOCY Booking API listening on port ${PORT}`);
});
