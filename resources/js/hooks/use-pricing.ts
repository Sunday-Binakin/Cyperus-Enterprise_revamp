import { useCallback } from 'react';

interface PricingCalculation {
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
}

interface UsePricingReturn extends PricingCalculation {
  formatPrice: (price: number) => string;
}

const SHIPPING_FEE = 0; // Free shipping
const TAX_RATE = 0.025; // 2.5% VAT

export function usePricing(subtotal: number): UsePricingReturn {
  const shippingFee = SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingFee + tax;

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(price).replace('GHS', 'GH₵');
  }, []);

  return {
    subtotal,
    shippingFee,
    tax,
    total,
    formatPrice
  };
}

