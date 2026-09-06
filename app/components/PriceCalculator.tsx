'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Circle } from 'lucide-react';

const PRICING_CONFIG = {
  oneTime: {
    services: {
      product: { name: 'Product', basePrice: 420, imagesIncluded: 20 },
      fashion: { name: 'Fashion', basePrice: 500, imagesIncluded: 25 },
      restaurant: { name: 'Restaurant', basePrice: 480, imagesIncluded: 20 },
      model: { name: 'Model', basePrice: 550, imagesIncluded: 30 },
    },
    imagePrice: 35,
  },
  subscription: {
    basePrice: 200,
    imagesIncluded: 15,
    imagePrice: 15,
  },
  locations: {
    studio: { name: 'Our Milan Studio', description: 'Full control of the light', priceModifier: 0 },
    location: { name: 'Your Location', description: 'We pack the studio into a van', priceModifier: 150 },
  },
  addOns: {
    modelCasting: { name: 'Model Casting', description: 'We cast, book and pay the talent', price: 200 },
    styling: { name: 'Styling & Set Build', description: 'Props, surfaces, wardrobe', price: 300 },
    videoClips: { name: 'Vertical Video Clips', description: '6–10 short clips from the same set', price: 250 },
    expressDelivery: { name: 'Express Delivery', description: 'Retouched files back in 48 hours', price: 150 },
  },
};

type ServiceType = keyof typeof PRICING_CONFIG.oneTime.services;
type LocationType = keyof typeof PRICING_CONFIG.locations;
type PricingMode = 'oneTime' | 'retainer' | 'subscription';

export default function PriceCalculator() {
  const t = useTranslations();
  const [pricingMode, setPricingMode] = useState<PricingMode>('oneTime');
  const [selectedService, setSelectedService] = useState<ServiceType>('product');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('studio');
  const [numImages, setNumImages] = useState(20);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [hoveredAddOn, setHoveredAddOn] = useState<string | null>(null);

  const isSubscription = pricingMode === 'subscription';
  const config = isSubscription ? PRICING_CONFIG.subscription : PRICING_CONFIG.oneTime;

  let basePrice = 0;
  let imagesIncluded = 0;
  let imagePrice = 0;

  if (isSubscription) {
    basePrice = PRICING_CONFIG.subscription.basePrice;
    imagesIncluded = PRICING_CONFIG.subscription.imagesIncluded;
    imagePrice = PRICING_CONFIG.subscription.imagePrice;
  } else {
    const service = PRICING_CONFIG.oneTime.services[selectedService];
    basePrice = service.basePrice;
    imagesIncluded = service.imagesIncluded;
    imagePrice = PRICING_CONFIG.oneTime.imagePrice;
  }

  const location = PRICING_CONFIG.locations[selectedLocation];
  const extraImages = Math.max(0, numImages - imagesIncluded);
  const extraImageCost = extraImages * imagePrice;

  const addOnsCost = Array.from(selectedAddOns).reduce((sum, addOn) => {
    const addon = PRICING_CONFIG.addOns[addOn as keyof typeof PRICING_CONFIG.addOns];
    return sum + (addon?.price || 0);
  }, 0);

  const totalPrice = basePrice + location.priceModifier + extraImageCost + addOnsCost;

  const toggleAddOn = (addOn: string) => {
    const newAddOns = new Set(selectedAddOns);
    if (newAddOns.has(addOn)) {
      newAddOns.delete(addOn);
    } else {
      newAddOns.add(addOn);
    }
    setSelectedAddOns(newAddOns);
  };

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-3">
            {t('pricing.subtitle', { defaultValue: 'THE PART EVERYONE ASKS ABOUT FIRST' })}
          </p>
          <h2 className="text-6xl font-bold mb-6 max-w-3xl leading-tight">
            {t('pricing.title', { defaultValue: 'See your price before you talk to anyone.' })}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('pricing.description', {
              defaultValue: 'Move the controls and watch the number change. This is the same calculation behind every quote we send — nothing hidden underneath it.',
            })}
          </p>
        </div>

        {/* Pricing Mode Tabs - Apple Style */}
        <div className="flex gap-2 mb-16 bg-white dark:bg-gray-800/50 p-1.5 rounded-2xl w-fit backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          {(['oneTime', 'retainer', 'subscription'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPricingMode(mode)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition duration-300 ${
                pricingMode === mode
                  ? 'bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {mode === 'oneTime' && 'One-Time'}
              {mode === 'retainer' && 'Retainer'}
              {mode === 'subscription' && 'Monthly'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Calculator Panel */}
          <div className="lg:col-span-2 space-y-10">
            {/* Service Type Selection - Only for One-Time */}
            {!isSubscription && (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
                  {t('pricing.whatPhotography', { defaultValue: 'What are we photographing?' })}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(PRICING_CONFIG.oneTime.services).map(([key, service]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedService(key as ServiceType)}
                      className={`px-4 py-3 rounded-2xl font-medium text-sm transition duration-200 ${
                        selectedService === key
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Images Slider */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <label className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  {t('pricing.finalImages', { defaultValue: 'How many final images?' })}
                </label>
                <span className="text-6xl font-bold text-gray-900 dark:text-white">{numImages}</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-black dark:accent-white"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-4">
                <span>5 — small drop</span>
                <span>150 — full catalogue</span>
              </div>
            </div>

            {/* Location Selection - Inline */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
                {t('pricing.where', { defaultValue: 'Where?' })}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PRICING_CONFIG.locations).map(([key, loc]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLocation(key as LocationType)}
                    className={`p-5 rounded-2xl border-2 text-left transition duration-200 ${
                      selectedLocation === key
                        ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-md'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold text-sm">{loc.name}</div>
                    <div className={`text-xs mt-2 ${selectedLocation === key ? 'text-gray-200 dark:text-gray-800' : 'text-gray-600 dark:text-gray-400'}`}>
                      {loc.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>


            {/* Add-ons - Apple Style 2 Columns */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">
                {t('pricing.anythingElse', { defaultValue: 'Anything else?' })}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PRICING_CONFIG.addOns).map(([key, addon]) => (
                  <button
                    key={key}
                    onClick={() => toggleAddOn(key)}
                    onMouseEnter={() => setHoveredAddOn(key)}
                    onMouseLeave={() => setHoveredAddOn(null)}
                    className={`p-5 rounded-2xl border-2 text-left transition duration-200 group ${
                      selectedAddOns.has(key)
                        ? 'border-black dark:border-white bg-black dark:bg-white'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${selectedAddOns.has(key) ? 'text-white dark:text-black' : 'text-gray-900 dark:text-white'}`}>
                          {addon.name}
                        </div>
                        <div className={`text-xs mt-2 leading-relaxed ${selectedAddOns.has(key) ? 'text-gray-300 dark:text-gray-700' : 'text-gray-600 dark:text-gray-400'}`}>
                          {addon.description}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className={`text-sm font-semibold whitespace-nowrap ${selectedAddOns.has(key) ? 'text-white dark:text-black' : 'text-gray-900 dark:text-white'}`}>
                          +€{addon.price}
                        </div>
                        {selectedAddOns.has(key) ? (
                          <CheckCircle2 className="w-5 h-5 text-white dark:text-black" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Estimate Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-black dark:bg-white text-white dark:text-black rounded-3xl p-8 space-y-8 shadow-lg">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-widest">
                  {t('pricing.estimate', { defaultValue: 'Your Estimate' })}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold">€{totalPrice}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 leading-relaxed">
                  {t('pricing.excludingVat', { defaultValue: 'Excluding VAT. Fixed in writing before we start.' })}
                </p>
              </div>

              <div className="border-t border-gray-700 dark:border-gray-300 pt-8 space-y-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-500">
                    {isSubscription ? 'Monthly subscription' : PRICING_CONFIG.oneTime.services[selectedService].name.toLowerCase()}
                  </span>
                  <span className="font-semibold">€{basePrice}</span>
                </div>

                {location.priceModifier > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Location setup</span>
                    <span className="font-semibold">€{location.priceModifier}</span>
                  </div>
                )}

                {extraImageCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">
                      {extraImages} extra images
                    </span>
                    <span className="font-semibold">€{extraImageCost}</span>
                  </div>
                )}

                {addOnsCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Add-ons</span>
                    <span className="font-semibold">€{addOnsCost}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 dark:border-gray-300 pt-8 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>€{totalPrice}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex gap-3 pb-3 border-b border-gray-700 dark:border-gray-300">
                  <span className="text-lg">📅</span>
                  <div>
                    <div className="font-semibold text-white dark:text-black">7 working days</div>
                    <div className="text-gray-500 dark:text-gray-500 mt-1">Files delivered</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg">✨</span>
                  <div>
                    <div className="font-semibold text-white dark:text-black">Signature</div>
                    <div className="text-gray-500 dark:text-gray-500 mt-1">Two shoot days</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-lime-400 dark:bg-lime-400 text-black font-semibold py-3.5 rounded-2xl hover:bg-lime-300 dark:hover:bg-lime-300 transition duration-200 shadow-md hover:shadow-lg">
                {t('pricing.holdDate', { defaultValue: 'Hold a date with this brief' })}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
