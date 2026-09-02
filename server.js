import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Initialize Stripe (requires STRIPE_SECRET_KEY environment variable)
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

let db;

function initializeDatabase() {
  const dbPath = join(__dirname, 'bookings.db');
  db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      package TEXT NOT NULL,
      shoot_type TEXT NOT NULL,
      location TEXT,
      booking_date DATE NOT NULL,
      booking_time TEXT,
      special_requests TEXT,

      -- Payment withholding
      total_price REAL NOT NULL,
      first_day_withheld REAL NOT NULL DEFAULT 0,
      remaining_days_withheld REAL NOT NULL DEFAULT 0,
      final_release REAL NOT NULL DEFAULT 0,
      payment_status TEXT DEFAULT 'pending',

      -- Stripe Payment
      stripe_payment_intent_id TEXT,
      stripe_customer_id TEXT,
      payment_method TEXT DEFAULT 'offline',

      -- Cancellation
      can_cancel_until DATE,
      is_cancelled BOOLEAN DEFAULT 0,
      cancelled_at TIMESTAMP,

      -- Status
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS booking_payment_history (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      transaction_type TEXT NOT NULL,
      amount REAL NOT NULL,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      description TEXT,
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );
  `);
}

// Calculate payment withholding: 25% day 1, 50% remaining days, 25% final release
function calculatePaymentBreakdown(totalPrice, numberOfDays = 1) {
  const firstDayWithheld = totalPrice * 0.25;
  const remainingDaysWithheld = totalPrice * 0.50;
  const finalRelease = totalPrice * 0.25;

  return {
    firstDayWithheld,
    remainingDaysWithheld,
    finalRelease
  };
}

function canCancelBooking(bookingDate) {
  const booking = new Date(bookingDate);
  const nextDay = new Date(booking);
  nextDay.setDate(nextDay.getDate() + 1);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now <= nextDay;
}

// Payment Endpoints

app.post('/api/payments/create-intent', async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Payment processing not configured. Please set STRIPE_SECRET_KEY environment variable.' });
  }

  try {
    const { booking_id, total_price, customer_email, customer_name } = req.body;

    if (!booking_id || !total_price || !customer_email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_price * 100), // Amount in cents
      currency: 'eur',
      customer: customer_email,
      description: `MEOCY Booking: ${booking_id}`,
      metadata: {
        booking_id,
        customer_name,
        customer_email
      },
      receipt_email: customer_email
    });

    // Update booking with payment intent
    const updateStmt = db.prepare('UPDATE bookings SET stripe_payment_intent_id = ?, payment_method = ? WHERE id = ?');
    updateStmt.run(paymentIntent.id, 'stripe', booking_id);

    res.json({
      success: true,
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      amount: total_price,
      currency: 'EUR'
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

app.post('/api/payments/confirm', async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Payment processing not configured' });
  }

  try {
    const { payment_intent_id, booking_id } = req.body;

    if (!payment_intent_id || !booking_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      // Update booking payment status
      const updateStmt = db.prepare('UPDATE bookings SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
      updateStmt.run('paid', booking_id);

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        status: 'succeeded'
      });
    } else if (paymentIntent.status === 'processing') {
      res.json({
        success: true,
        message: 'Payment is processing',
        status: 'processing'
      });
    } else {
      res.status(400).json({
        error: 'Payment not completed',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

app.get('/api/payments/status/:payment_intent_id', async (req, res) => {
  if (!stripe) {
    return res.status(400).json({ error: 'Payment processing not configured' });
  }

  try {
    const { payment_intent_id } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    res.json({
      payment_intent_id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      created: new Date(paymentIntent.created * 1000).toISOString(),
      customer_email: paymentIntent.receipt_email
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
});

// API Endpoints

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
      special_requests,
      total_price
    } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !packageType || !booking_date || !total_price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bookingId = uuidv4();
    const { firstDayWithheld, remainingDaysWithheld, finalRelease } = calculatePaymentBreakdown(total_price);

    const bookingDateObj = new Date(booking_date);
    const canCancelUntil = new Date(bookingDateObj);
    canCancelUntil.setDate(canCancelUntil.getDate() + 1);

    const stmt = db.prepare(`
      INSERT INTO bookings (
        id, customer_name, customer_email, customer_phone,
        package, shoot_type, location, booking_date, booking_time,
        special_requests, total_price, first_day_withheld,
        remaining_days_withheld, final_release, can_cancel_until
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      bookingId, customer_name, customer_email, customer_phone,
      packageType, shoot_type, location, booking_date, booking_time,
      special_requests, total_price, firstDayWithheld,
      remainingDaysWithheld, finalRelease, canCancelUntil.toISOString().split('T')[0]
    );

    // Record first day withholding
    const historyId = uuidv4();
    const historyStmt = db.prepare(`
      INSERT INTO booking_payment_history (id, booking_id, transaction_type, amount, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    historyStmt.run(historyId, bookingId, 'withheld', firstDayWithheld, 'First day booking withholding (25%)');

    res.json({
      success: true,
      booking_id: bookingId,
      message: 'Booking created successfully',
      payment_breakdown: {
        total_price,
        first_day_withheld: firstDayWithheld,
        remaining_days_withheld: remainingDaysWithheld,
        final_release: finalRelease,
        can_cancel_until: canCancelUntil.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings/:booking_id', (req, res) => {
  try {
    const { booking_id } = req.params;

    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(booking_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const historyStmt = db.prepare('SELECT * FROM booking_payment_history WHERE booking_id = ? ORDER BY transaction_date DESC');
    const paymentHistory = historyStmt.all(booking_id);

    res.json({
      booking,
      payment_history: paymentHistory,
      can_cancel: canCancelBooking(booking.booking_date) && !booking.is_cancelled,
      can_change_date: !booking.is_cancelled
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.post('/api/bookings/:booking_id/cancel', (req, res) => {
  try {
    const { booking_id } = req.params;

    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(booking_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.is_cancelled) {
      return res.status(400).json({ error: 'Booking already cancelled' });
    }

    if (!canCancelBooking(booking.booking_date)) {
      return res.status(400).json({ error: 'Cancellation window has passed. You can only cancel within 24 hours of the first booking day.' });
    }

    const updateStmt = db.prepare('UPDATE bookings SET is_cancelled = 1, cancelled_at = CURRENT_TIMESTAMP WHERE id = ?');
    updateStmt.run(booking_id);

    // Record reversal of withholding
    const reverseAmount = booking.first_day_withheld;
    const historyId = uuidv4();
    const historyStmt = db.prepare(`
      INSERT INTO booking_payment_history (id, booking_id, transaction_type, amount, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    historyStmt.run(historyId, booking_id, 'reversed', reverseAmount, 'Withholding reversed due to cancellation');

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      refunded_amount: reverseAmount
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

app.post('/api/bookings/:booking_id/change-date', (req, res) => {
  try {
    const { booking_id } = req.params;
    const { new_booking_date } = req.body;

    if (!new_booking_date) {
      return res.status(400).json({ error: 'New booking date is required' });
    }

    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(booking_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.is_cancelled) {
      return res.status(400).json({ error: 'Cannot change date of a cancelled booking' });
    }

    // You cannot change the date without cancelling first
    return res.status(400).json({ error: 'To change the booking date, you must cancel this booking first and create a new one.' });
  } catch (error) {
    console.error('Error changing booking date:', error);
    res.status(500).json({ error: 'Failed to change booking date' });
  }
});

app.post('/api/bookings/:booking_id/mark-completed', (req, res) => {
  try {
    const { booking_id } = req.params;

    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(booking_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.is_cancelled) {
      return res.status(400).json({ error: 'Cannot mark cancelled booking as completed' });
    }

    const updateStmt = db.prepare('UPDATE bookings SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    updateStmt.run('completed', booking_id);

    // Record final release
    const historyId = uuidv4();
    const historyStmt = db.prepare(`
      INSERT INTO booking_payment_history (id, booking_id, transaction_type, amount, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    historyStmt.run(historyId, booking_id, 'released', booking.final_release, 'Final payment released (25%)');

    res.json({
      success: true,
      message: 'Booking marked as completed',
      final_payment_released: booking.final_release
    });
  } catch (error) {
    console.error('Error marking booking as completed:', error);
    res.status(500).json({ error: 'Failed to mark booking as completed' });
  }
});

app.get('/api/bookings/customer/:email', (req, res) => {
  try {
    const { email } = req.params;

    const stmt = db.prepare('SELECT * FROM bookings WHERE customer_email = ? ORDER BY created_at DESC');
    const bookings = stmt.all(email);

    res.json({
      bookings: bookings.map(booking => ({
        ...booking,
        can_cancel: canCancelBooking(booking.booking_date) && !booking.is_cancelled
      }))
    });
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

const PORT = process.env.PORT || 3000;
initializeDatabase();

app.listen(PORT, () => {
  console.log(`MEOCY Booking API listening on port ${PORT}`);
});
