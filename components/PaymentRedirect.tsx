'use client';

import { useEffect } from 'react';

export function PaymentRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/confirmation';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
