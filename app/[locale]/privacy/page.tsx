'use client';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-300">
        <p>
          Last updated: {new Date().getFullYear()}
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Introduction</h2>
        <p>
          MEOCY Photography Studio ("we" or "us" or "our") operates the www.meocy.com website (hereinafter referred to as the "Service").
        </p>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <h3 className="text-xl font-bold text-black dark:text-white mt-4">Types of Data Collected:</h3>
        <ul className="list-disc pl-6">
          <li>Personal Data (name, email address, phone number)</li>
          <li>Usage Data (IP address, browser type, pages visited)</li>
          <li>Booking Information (dates, packages, preferences)</li>
        </ul>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Use of Data</h2>
        <p>
          MEOCY Photography Studio uses the collected data for various purposes:
        </p>
        <ul className="list-disc pl-6">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information</li>
          <li>To monitor the usage of our Service</li>
        </ul>
        <h2 className="text-2xl font-bold text-black dark:text-white mt-6">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at hello@meocy.com
        </p>
      </div>
    </div>
  );
}
