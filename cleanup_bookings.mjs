import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqwwlfppzgkylloywzkc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxd3dsZnBwemdreWxsb3l3emtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNzQ3NzMsImV4cCI6MjEwMzk1MDc3M30.IT15sxrDiNvsurBX3jKBDPMcaEscMKg-L4-jAShK0Io'
);

console.log('📊 Fetching all bookings...');
const { data: allBookings, error: fetchError } = await supabase
  .from('bookings')
  .select('*')
  .order('created_at', { ascending: false });

if (fetchError) {
  console.error('❌ Error fetching bookings:', fetchError);
  process.exit(1);
}

console.log(`\n📋 Total bookings: ${allBookings.length}\n`);
console.log('Bookings:');
allBookings.forEach(b => {
  console.log(`  - ${b.name} | ${b.preferred_date} | ${b.email}`);
});

// Delete old test bookings (Sept 15-18 2026)
console.log('\n🗑️  Deleting old test bookings (Sept 15-18)...');
const { error: deleteError, count } = await supabase
  .from('bookings')
  .delete()
  .in('preferred_date', ['2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18']);

if (deleteError) {
  console.error('❌ Delete error:', deleteError);
  process.exit(1);
}

console.log(`✅ Deleted bookings from Sept 15-18\n`);

// Fetch remaining bookings
const { data: remainingBookings } = await supabase
  .from('bookings')
  .select('*')
  .order('created_at', { ascending: false });

console.log(`📋 Remaining bookings: ${remainingBookings.length}\n`);
if (remainingBookings.length > 0) {
  console.log('Active bookings:');
  remainingBookings.forEach(b => {
    console.log(`  - ${b.name} | ${b.preferred_date} | ${b.email}`);
  });
} else {
  console.log('No bookings remaining');
}

console.log('\n✅ Cleanup complete!');
