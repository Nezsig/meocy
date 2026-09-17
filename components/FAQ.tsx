'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h4m4 0h4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How far in advance should I book?',
      answer:
        'We recommend booking at least 2-3 weeks in advance. However, we can sometimes accommodate rush bookings depending on availability. Contact us directly for urgent requests.',
      icon: <CalendarIcon />,
    },
    {
      question: 'What is included in each package?',
      answer:
        'Each package includes the photoshoot with a professional photographer, edited digital images, and a usage license. Specific details vary by package - check our packages section for complete details.',
      icon: <PackageIcon />,
    },
    {
      question: 'Can I reschedule my booking?',
      answer:
        'Yes, we allow rescheduling with at least 7 days notice. Rescheduling within 7 days may incur additional fees. Contact us to discuss your specific situation.',
      icon: <RefreshIcon />,
    },
    {
      question: 'What is your payment and cancellation policy?',
      answer:
        'A 25% deposit is required to confirm the booking. The remaining balance is due on the day of the shoot. Cancellations within 7 days of the shoot are non-refundable.',
      icon: <CreditCardIcon />,
    },
    {
      question: 'How long until I receive my photos?',
      answer:
        'Typical turnaround is 5-7 business days for edited images. Express delivery is available for an additional fee - images within 48 hours.',
      icon: <ClockIcon />,
    },
    {
      question: 'Do you offer rush/express services?',
      answer:
        'Yes! Add the Express Delivery option for 48-hour turnaround (additional €150). For same-day needs, please contact us directly.',
      icon: <BoltIcon />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">Everything you need to know about booking with MEOCY</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="group"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full text-left transition-all duration-300 ${
                openIndex === index
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
                  : 'bg-white text-gray-900 hover:shadow-lg border border-gray-200'
              } rounded-2xl p-6 shadow-sm hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-white/20' : 'bg-gray-100 text-gray-700'
                }`}>
                  {faq.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                </div>
                <svg
                  className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
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
              </div>
            </button>

            {openIndex === index && (
              <div className="mt-2 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-gray-700 leading-relaxed animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
