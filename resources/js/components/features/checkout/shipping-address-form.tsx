import { Truck } from 'lucide-react';
import type { ShippingAddress } from '@/hooks/use-shipping-address';

interface ShippingAddressFormProps {
  emailForReceipt: string;
  onEmailChange: (email: string) => void;
  shippingAddress: ShippingAddress;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
}

export function ShippingAddressForm({
  emailForReceipt,
  onEmailChange,
  shippingAddress,
  onAddressChange
}: ShippingAddressFormProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Truck className="w-5 h-5 text-[#EFE554]" />
        <h2 className="text-xl font-semibold">Shipping Address</h2>
      </div>

      {/* Email for receipt */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Email for receipt</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={emailForReceipt}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          value={shippingAddress.fullName}
          onChange={(e) => onAddressChange('fullName', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={shippingAddress.phone}
          onChange={(e) => onAddressChange('phone', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Address *"
          value={shippingAddress.address}
          onChange={(e) => onAddressChange('address', e.target.value)}
          className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="text"
          placeholder="City *"
          value={shippingAddress.city}
          onChange={(e) => onAddressChange('city', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Region *"
          value={shippingAddress.region}
          onChange={(e) => onAddressChange('region', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Country *"
          value={shippingAddress.country}
          onChange={(e) => onAddressChange('country', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Postal Code (Optional)"
          value={shippingAddress.postalCode || ''}
          onChange={(e) => onAddressChange('postalCode', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#EFE554] focus:outline-none"
        />
      </div>
    </div>
  );
}

