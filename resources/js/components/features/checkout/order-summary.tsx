import type { CartItem } from '@/store/cartSlice';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  formatPrice: (price: number) => string;
}

export function OrderSummary({
  items,
  subtotal,
  shippingFee,
  tax,
  total,
  formatPrice
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product_id} className="flex gap-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Qty: {item.quantity || 1}</span>
                <span>{formatPrice(item.price * (item.quantity || 1))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-700 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Shipping</span>
          <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tax (2.5% VAT)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-[#EFE554]">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

