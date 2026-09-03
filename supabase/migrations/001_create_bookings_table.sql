-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  package_type TEXT,
  shoot_type TEXT,
  location TEXT,
  preferred_date DATE,
  preferred_time TIME,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create indexes for faster queries
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_preferred_date ON bookings(preferred_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public API)
CREATE POLICY "Allow public to insert bookings" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public to read bookings (for availability checking)
CREATE POLICY "Allow public to read bookings" ON bookings
  FOR SELECT
  USING (true);

-- Comment on table
COMMENT ON TABLE bookings IS 'Stores photography booking requests from clients';
