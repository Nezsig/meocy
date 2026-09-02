import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import crypto from 'crypto';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let db;

const PACKAGE_MAP = {
  basic: { name: 'Basic', price: 200 },
  travel: { name: 'Silver', price: 400 },
  outdoor: { name: 'Gold', price: 750 },
  video: { name: 'Platinum', price: 1000 },
  subscription: { name: 'Monthly Subscription', price: 0 },
  custom: { name: 'Custom Quote', price: 0 }
};

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

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT,
      package_name TEXT,
      amount REAL DEFAULT 0,
      shoot_type TEXT,
      location TEXT,
      special_requests TEXT,
      booking_date DATE,
      booking_time TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      delivery_date DATE,
      delivery_time TEXT,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id),
      type TEXT NOT NULL,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL
    );
  `);
}

// ---------- Admin auth ----------

function timingSafeEqualStr(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const session = db.prepare('SELECT * FROM admin_sessions WHERE token = ?').get(token);
  if (!session || new Date(session.expires_at) < new Date()) {
    if (session) db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
    return res.status(401).json({ error: 'Session expired' });
  }
  next();
}

app.post('/api/admin/login', (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password is not configured on the server' });
  }

  const { password } = req.body;
  if (!password || !timingSafeEqualStr(password, adminPassword)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)').run(token, expiresAt);

  res.json({ success: true, token });
});

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const token = req.headers.authorization.slice(7);
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  res.json({ success: true });
});

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ authenticated: true });
});

// ---------- Public booking endpoints ----------

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

// Create a booking: books the date + creates a real order the admin dashboard can see
app.post('/api/bookings', (req, res) => {
  try {
    const {
      name, email, phone, package: packageValue, shootType,
      location, preferredDate, preferredTime, specialRequests
    } = req.body;

    if (!name || !email || !preferredDate) {
      return res.status(400).json({ error: 'name, email and preferredDate are required' });
    }

    const existing = db.prepare('SELECT * FROM booked_dates WHERE booking_date = ?').get(preferredDate);
    if (existing) {
      return res.status(400).json({ error: 'This date is already booked' });
    }

    const pkg = PACKAGE_MAP[packageValue] || { name: packageValue || 'Not specified', price: 0 };
    const orderCount = db.prepare('SELECT COUNT(*) AS c FROM orders').get().c;
    const orderNumber = `ORD-${String(orderCount + 1).padStart(3, '0')}`;
    const orderId = uuidv4();
    const dateId = uuidv4();

    const insertOrder = db.prepare(`
      INSERT INTO orders (
        id, order_number, customer_name, customer_email, customer_phone,
        package_name, amount, shoot_type, location, special_requests,
        booking_date, booking_time, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);
    const insertDate = db.prepare(`
      INSERT INTO booked_dates (id, booking_date, customer_name, customer_email, customer_phone, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const runBoth = db.transaction(() => {
      insertOrder.run(
        orderId, orderNumber, name, email, phone || null,
        pkg.name, pkg.price, shootType || null, location || null, specialRequests || null,
        preferredDate, preferredTime || null
      );
      insertDate.run(dateId, preferredDate, name, email, phone || null, `Order ${orderNumber}`);
    });
    runBoth();

    res.json({ success: true, order_number: orderNumber, order_id: orderId });
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'This date is already booked' });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Add a booked date (admin)
app.post('/api/admin/add-date', requireAdmin, (req, res) => {
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
app.post('/api/admin/remove-date', requireAdmin, (req, res) => {
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

    const apiKey = process.env.RESEND_API_KEY;
    console.log('🔍 Email endpoint called:', { email, apiKeyExists: !!apiKey });

    if (!apiKey) {
      console.error('❌ RESEND_API_KEY is not set!');
      return res.status(500).json({ error: 'Resend API key not configured' });
    }

    const resend = new Resend(apiKey);

    console.log('📧 Sending email to:', email);

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
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
    });

    console.log('📮 Resend response:', { success: !!result.id, error: result.error });

    if (result.error) {
      console.error('❌ Email send error:', result.error);
      return res.status(500).json({ error: 'Failed to send email', details: result.error });
    }

    console.log('✅ Email sent successfully! ID:', result.id);
    res.json({
      success: true,
      message: 'Confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// ---------- Admin: orders ----------

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  try {
    const totalRevenue = db.prepare(`SELECT COALESCE(SUM(amount), 0) AS v FROM orders WHERE status IN ('paid', 'delivered')`).get().v;
    const activeOrders = db.prepare(`SELECT COUNT(*) AS v FROM orders WHERE status IN ('pending', 'paid')`).get().v;
    const pendingPayment = db.prepare(`SELECT COALESCE(SUM(amount), 0) AS v FROM orders WHERE status = 'pending'`).get().v;
    const thisMonthOrders = db.prepare(`SELECT COUNT(*) AS v FROM orders WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`).get().v;

    res.json({
      total_revenue: totalRevenue,
      active_orders: activeOrders,
      pending_payment: pendingPayment,
      this_month_orders: thisMonthOrders
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/admin/charts', requireAdmin, (req, res) => {
  try {
    const revenueTrend = db.prepare(`
      SELECT strftime('%Y-%m', created_at) AS month, COALESCE(SUM(amount), 0) AS revenue
      FROM orders
      WHERE status IN ('paid', 'delivered') AND created_at >= datetime('now', '-6 months')
      GROUP BY month ORDER BY month ASC
    `).all();

    const orderDistribution = db.prepare(`
      SELECT COALESCE(package_name, 'Unknown') AS package_name, COUNT(*) AS count
      FROM orders GROUP BY package_name
    `).all();

    const paymentStatus = db.prepare(`
      SELECT status, COUNT(*) AS count FROM orders GROUP BY status
    `).all();

    const weeklyGrowth = db.prepare(`
      SELECT strftime('%Y-%W', created_at) AS week, COUNT(*) AS count
      FROM orders
      WHERE created_at >= datetime('now', '-28 days')
      GROUP BY week ORDER BY week ASC
    `).all();

    res.json({
      revenue_trend: revenueTrend,
      order_distribution: orderDistribution,
      payment_status: paymentStatus,
      weekly_growth: weeklyGrowth
    });
  } catch (error) {
    console.error('Error fetching charts:', error);
    res.status(500).json({ error: 'Failed to fetch charts' });
  }
});

app.get('/api/admin/orders', requireAdmin, (req, res) => {
  try {
    const { search, status } = req.query;
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }
    query += ' ORDER BY created_at DESC LIMIT 200';

    const orders = db.prepare(query).all(...params);
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/admin/orders/:id', requireAdmin, (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const media = db.prepare('SELECT * FROM media WHERE order_id = ? ORDER BY uploaded_at DESC').all(req.params.id);
    res.json({ order, media });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.post('/api/admin/orders', requireAdmin, (req, res) => {
  try {
    const {
      customer_name, customer_email, customer_phone, package_name, amount,
      shoot_type, location, special_requests, booking_date, booking_time,
      status, delivery_date, delivery_time, notes
    } = req.body;

    if (!customer_name) {
      return res.status(400).json({ error: 'customer_name is required' });
    }

    const orderCount = db.prepare('SELECT COUNT(*) AS c FROM orders').get().c;
    const orderNumber = `ORD-${String(orderCount + 1).padStart(3, '0')}`;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO orders (
        id, order_number, customer_name, customer_email, customer_phone,
        package_name, amount, shoot_type, location, special_requests,
        booking_date, booking_time, status, delivery_date, delivery_time, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, orderNumber, customer_name, customer_email || null, customer_phone || null,
      package_name || null, amount || 0, shoot_type || null, location || null, special_requests || null,
      booking_date || null, booking_time || null, status || 'pending', delivery_date || null, delivery_time || null, notes || null
    );

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/admin/orders/:id', requireAdmin, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    const fields = [
      'customer_name', 'customer_email', 'customer_phone', 'package_name', 'amount',
      'shoot_type', 'location', 'special_requests', 'booking_date', 'booking_time',
      'status', 'delivery_date', 'delivery_time', 'notes'
    ];

    const updates = [];
    const params = [];
    for (const field of fields) {
      if (field in req.body) {
        updates.push(`${field} = ?`);
        params.push(req.body[field]);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");
    params.push(req.params.id);

    db.prepare(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/admin/orders/:id', requireAdmin, (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media WHERE order_id = ?').all(req.params.id);
    for (const item of media) {
      const filePath = join(__dirname, 'public', item.url);
      fs.unlink(filePath, () => {});
    }
    db.prepare('DELETE FROM media WHERE order_id = ?').run(req.params.id);
    const result = db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);

    if (result.changes === 0) return res.status(404).json({ error: 'Order not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// ---------- Admin: media upload ----------

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = join(__dirname, 'public', 'uploads', req.params.id);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});
const upload = multer({ storage: uploadStorage, limits: { fileSize: 200 * 1024 * 1024 } });

app.post('/api/admin/orders/:id/media', requireAdmin, upload.array('files', 20), (req, res) => {
  try {
    const order = db.prepare('SELECT id FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const inserted = [];
    for (const file of req.files || []) {
      const id = uuidv4();
      const type = file.mimetype.startsWith('video') ? 'video' : 'photo';
      const url = `/uploads/${req.params.id}/${file.filename}`;
      db.prepare('INSERT INTO media (id, order_id, type, filename, url) VALUES (?, ?, ?, ?, ?)')
        .run(id, req.params.id, type, file.originalname, url);
      inserted.push({ id, order_id: req.params.id, type, filename: file.originalname, url });
    }

    res.json({ success: true, media: inserted });
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

app.delete('/api/admin/media/:id', requireAdmin, (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media WHERE id = ?').get(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    const filePath = join(__dirname, 'public', media.url);
    fs.unlink(filePath, () => {});
    db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

const PORT = process.env.PORT || 3000;
initializeDatabase();

app.listen(PORT, () => {
  console.log(`MEOCY Booking API listening on port ${PORT}`);
});
