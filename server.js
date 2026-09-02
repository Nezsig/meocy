import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

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
    CREATE TABLE IF NOT EXISTS booked_dates (
      id TEXT PRIMARY KEY,
      booking_date DATE NOT NULL UNIQUE,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Get all booked dates
app.get('/api/booked-dates', (req, res) => {
  try {
    const stmt = db.prepare('SELECT booking_date, customer_name, customer_email, notes FROM booked_dates ORDER BY booking_date ASC');
    const dates = stmt.all();
    res.json({ booked_dates: dates });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ error: 'Failed to fetch booked dates' });
  }
});

// Check if a date is booked
app.get('/api/check-date/:date', (req, res) => {
  try {
    const { date } = req.params;
    const stmt = db.prepare('SELECT * FROM booked_dates WHERE booking_date = ?');
    const bookedDate = stmt.get(date);

    res.json({
      is_booked: !!bookedDate,
      booking: bookedDate || null
    });
  } catch (error) {
    console.error('Error checking date:', error);
    res.status(500).json({ error: 'Failed to check date' });
  }
});

// Add a booked date (admin)
app.post('/api/admin/add-date', (req, res) => {
  try {
    const { booking_date, customer_name, customer_email, customer_phone, notes } = req.body;

    if (!booking_date) {
      return res.status(400).json({ error: 'booking_date is required' });
    }

    const id = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO booked_dates (id, booking_date, customer_name, customer_email, customer_phone, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, booking_date, customer_name || null, customer_email || null, customer_phone || null, notes || null);

    res.json({
      success: true,
      message: 'Date marked as booked',
      date: booking_date
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'This date is already booked' });
    }
    console.error('Error adding date:', error);
    res.status(500).json({ error: 'Failed to add booked date' });
  }
});

// Remove a booked date (admin)
app.post('/api/admin/remove-date', (req, res) => {
  try {
    const { booking_date } = req.body;

    if (!booking_date) {
      return res.status(400).json({ error: 'booking_date is required' });
    }

    const stmt = db.prepare('DELETE FROM booked_dates WHERE booking_date = ?');
    const result = stmt.run(booking_date);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Date not found' });
    }

    res.json({
      success: true,
      message: 'Date removed from booked list',
      date: booking_date
    });
  } catch (error) {
    console.error('Error removing date:', error);
    res.status(500).json({ error: 'Failed to remove booked date' });
  }
});

// Send booking confirmation email
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, name, package_name, date, phone, notes } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'email and name are required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'MEOCY - Booking Request Received ✓',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #0a0a0a; margin-top: 0;">Thank you, ${name}!</h2>

            <p style="color: #68686c; font-size: 16px;">We've received your booking request. Here are your details:</p>

            <div style="background-color: #f6f6f4; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Package:</strong> ${package_name || 'Not specified'}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${date || 'Not specified'}</p>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              ${notes ? `<p style="margin: 10px 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>

            <p style="color: #68686c; font-size: 14px;">We'll confirm your booking and discuss final details with you shortly. In the meantime, if you have any questions, feel free to reach out.</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
              <p style="color: #68686c; font-size: 12px; margin: 0;">
                MEOCY Studio<br>
                Milan, Italy<br>
                hello@meocy.com<br>
                +39 379 105 1000
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
initializeDatabase();

app.listen(PORT, () => {
  console.log(`MEOCY Booking API listening on port ${PORT}`);
});
