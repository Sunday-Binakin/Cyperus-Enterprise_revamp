import { useState } from 'react';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
}

const initialAddress: ShippingAddress = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  country: 'Ghana',
  postalCode: '',
};

export function useShippingAddress() {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialAddress);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetAddress = () => {
    setShippingAddress(initialAddress);
  };

  const isAddressComplete = () => {
    const requiredFields: (keyof ShippingAddress)[] = [
      'fullName',
      'email',
      'phone',
      'address',
      'city',
      'region',
      'country'
    ];
    
    return requiredFields.every(field => shippingAddress[field]?.trim() !== '');
  };

  return {
    shippingAddress,
    setShippingAddress,
    updateField,
    resetAddress,
    isAddressComplete
  };
}

