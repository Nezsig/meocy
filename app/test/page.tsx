export const dynamic = 'force-dynamic';

export default function TestPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>If you see this, the root layout and static pages work fine.</p>
      <p>HTTP 500 might be locale-routing specific.</p>
    </div>
  );
}
