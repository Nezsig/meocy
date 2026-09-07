'use client';

import Image from 'next/image';

export default function Studio() {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pt-20">
            <span className="inline-block bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
              Our Studio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Professional Studio Space
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fully equipped with professional lighting, backdrop systems, and state-of-the-art gear
            </p>
          </div>

          {/* Full-width Studio Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-20">
            <Image
              src="/studio-setup.jpg"
              alt="MEOCY Studio Setup with Professional Equipment"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Studio Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                State-of-the-Art Equipment
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Professional Lighting</h4>
                    <p className="text-gray-600">Multi-light setups with softboxes and reflectors for perfect illumination</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Backdrop Systems</h4>
                    <p className="text-gray-600">Wide range of backdrops and backdrop stands for various shooting styles</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm0 0c0 1.105 1.343 2 3 2s3-.895 3-2m0 0V6m0 0c0-1.105-1.343-2-3-2s-3 .895-3 2m3-2c-1.657 0-3 .895-3 2v.001M9 19c1.657 0 3-.895 3-2M21 19c1.105 0 2-1.343 2-3s-.895-3-2-3-3 1.343-3 3 .895 3 2 3z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Professional Gear</h4>
                    <p className="text-gray-600">High-end cameras, lenses, and support equipment for superior image quality</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Comfortable Setting</h4>
                    <p className="text-gray-600">Climate-controlled studio with waiting area and styling space</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200">
                <p className="text-gray-700 italic">
                  "Our studio is designed to ensure every shoot is smooth, comfortable, and produces stunning results."
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose MEOCY Studio?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">Professional environment for perfect shoots</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">Natural and artificial lighting options</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">Multiple backdrop and setting options</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">Comfortable and welcoming space</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
