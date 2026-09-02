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

const PORT = process.env.PORT || 3000;
initializeDatabase();

app.listen(PORT, () => {
  console.log(`MEOCY Booking API listening on port ${PORT}`);
});
