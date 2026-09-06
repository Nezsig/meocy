'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';

interface Prices {
  [key: string]: number;
}

export default function Calculator() {
  const t = useTranslations();

  const [serviceType, setServiceType] = useState('product');
  const [imageCount, setImageCount] = useState(50);
  const [location, setLocation] = useState('studio');
  const [addOns, setAddOns] = useState<string[]>([]);

  // Base prices per service type (per hour or per shoot)
  const basePrices: Prices = {
    product: 50,
    fashion: 75,
    restaurant: 100,
    model: 120,
  };

  // Add-on prices
  const addOnPrices: Prices = {
    modelCasting: 100,
    styling: 75,
    videoClips: 200,
    expressDelivery: 150,
  };

  // Calculate price
  const { basePrice, total, breakdown } = useMemo(() => {
    let base = basePrices[serviceType] * Math.ceil(imageCount / 10);
    if (location === 'onLocation') base += 150;

    let addOnTotal = 0;
    addOns.forEach((addon) => {
      addOnTotal += addOnPrices[addon] || 0;
    });

    return {
      basePrice: base,
      total: base + addOnTotal,
      breakdown: {
        base,
        location: location === 'onLocation' ? 150 : 0,
        addOns: addOnTotal,
      },
    };
  }, [serviceType, imageCount, location, addOns]);

  const toggleAddOn = (addon: string) => {
    setAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">{t('calculator.title')}</h2>

        {/* Service Type */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            {t('calculator.serviceType')}
          </label>
          <div className="space-y-2">
            {['product', 'fashion', 'restaurant', 'model'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  value={type}
                  checked={serviceType === type}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="mr-3"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Count */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            {t('calculator.imageCount')}: {imageCount}
          </label>
          <input
            type="range"
            min="5"
            max="150"
            step="5"
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>5</span>
            <span>150</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            {t('calculator.location')}
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="studio">{t('calculator.studio')}</option>
            <option value="onLocation">{t('calculator.onLocation')}</option>
          </select>
        </div>

        {/* Add-ons */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            {t('calculator.addOns')}
          </label>
          <div className="space-y-2">
            {['modelCasting', 'styling', 'videoClips', 'expressDelivery'].map((addon) => (
              <label key={addon} className="flex items-center">
                <input
                  type="checkbox"
                  checked={addOns.includes(addon)}
                  onChange={() => toggleAddOn(addon)}
                  className="mr-3"
                />
                <span>{t(`calculator.${addon}`)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-100 rounded-lg p-8 h-fit">
        <h3 className="text-2xl font-bold mb-6">{t('calculator.estimatedPrice')}</h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-700">Service & Images:</span>
            <span className="font-semibold">€{breakdown.base}</span>
          </div>

          {breakdown.location > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">On-location:</span>
              <span className="font-semibold">€{breakdown.location}</span>
            </div>
          )}

          {breakdown.addOns > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Add-ons:</span>
              <span className="font-semibold">€{breakdown.addOns}</span>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-2xl">€{total}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          25% deposit required to confirm booking
        </p>

        <button className="btn btn-secondary w-full">
          Proceed to Booking
        </button>
      </div>
    </div>
  );
}
