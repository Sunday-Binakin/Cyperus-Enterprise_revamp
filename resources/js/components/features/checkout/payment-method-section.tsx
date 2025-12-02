import { CreditCard } from 'lucide-react';

export function PaymentMethodSection() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#EFE554]" />
        <h2 className="text-xl font-semibold">Payment Method</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-[#EFE554] bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-[#EFE554] bg-[#EFE554]" />
            <div>
              <div className="font-medium">Secure Payment via Paystack</div>
              <div className="text-sm text-gray-400">
                Pay with cards, mobile money, bank transfer, USSD, or QR code
              </div>
              <div className="text-xs text-[#EFE554] mt-1">
                Supports all major payment methods in Ghana
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

