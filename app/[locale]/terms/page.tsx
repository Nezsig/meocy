'use client';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-300">
        <p>
          Last updated: {new Date().getFullYear()}
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Acceptance of Terms</h2>
        <p>
          By accessing and using the MEOCY Photography Studio website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Booking Terms</h2>
        <ul className="list-disc pl-6">
          <li>All bookings must be confirmed with a 50% deposit</li>
          <li>Cancellations must be made 7 days in advance for a full refund</li>
          <li>Rescheduling is available up to 48 hours before the scheduled date</li>
          <li>No-shows will result in forfeiture of the deposit</li>
        </ul>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Intellectual Property Rights</h2>
        <p>
          All content, images, and materials on this website are the intellectual property of MEOCY Photography Studio. Unauthorized use is prohibited.
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Limitation of Liability</h2>
        <p>
          MEOCY Photography Studio shall not be liable for any damages arising from the use or inability to use the website or the services provided.
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Contact Us</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at hello@meocy.com
        </p>
      </div>
    </div>
  );
}
