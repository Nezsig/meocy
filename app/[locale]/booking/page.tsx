import BookingForm from '@/components/BookingForm';

export const dynamic = 'force-dynamic';

export default function BookingPage() {

  return (
    <div className="py-20 min-h-screen" style={{ background: '#f9fafb' }}>
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-center mb-6 text-black">
            Make Appointment
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Choose your preferred time and service to book your photography session
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white rounded-16 shadow-lg p-8 md:p-12">
          <BookingForm />
        </div>

        {/* Info Footer */}
        <div className="max-w-2xl mx-auto mt-12 text-center text-sm text-gray-500">
          <p>Questions? Contact us at hello@meocy.com or call us directly</p>
        </div>
      </div>

      <style>{`
        .rounded-16 {
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}
