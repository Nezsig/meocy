'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How far in advance should I book?',
      answer:
        'We recommend booking at least 2-3 weeks in advance. However, we can sometimes accommodate rush bookings depending on availability. Contact us directly for urgent requests.',
    },
    {
      question: 'What is included in each package?',
      answer:
        'Each package includes the photoshoot with a professional photographer, edited digital images, and a usage license. Specific details vary by package - check our packages section for complete details.',
    },
    {
      question: 'Can I reschedule my booking?',
      answer:
        'Yes, we allow rescheduling with at least 7 days notice. Rescheduling within 7 days may incur additional fees. Contact us to discuss your specific situation.',
    },
    {
      question: 'What is your payment and cancellation policy?',
      answer:
        'A 25% deposit is required to confirm the booking. The remaining balance is due on the day of the shoot. Cancellations within 7 days of the shoot are non-refundable.',
    },
    {
      question: 'How long until I receive my photos?',
      answer:
        'Typical turnaround is 5-7 business days for edited images. Express delivery is available for an additional fee - images within 48 hours.',
    },
    {
      question: 'Do you offer rush/express services?',
      answer:
        'Yes! Add the Express Delivery option for 48-hour turnaround (additional €150). For same-day needs, please contact us directly.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition"
            >
              <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
              <svg
                className={`w-6 h-6 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
