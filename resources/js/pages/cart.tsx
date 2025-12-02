import { useCart } from '@/store/cartHooks';
import { router, Link } from '@inertiajs/react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  
  const formattedTotal = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(totalPrice).replace('GHS', 'GH₵');

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    router.visit('/checkout');
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
            <div className="bg-gray-900 rounded-lg p-12 border border-gray-800">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Add some products to get started</p>
              <Link
                href="/"
                className="inline-block bg-[#EFE554] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-6">
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div
                        key={item.product_id}
                        className={`flex gap-6 p-4 bg-gray-800 rounded-lg ${
                          index !== 0 ? 'border-t border-gray-700' : ''
                        }`}
                      >
                        <div className="relative h-24 w-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                          <p className="text-[#EFE554] font-semibold mb-4">
                            {new Intl.NumberFormat('en-GH', {
                              style: 'currency',
                              currency: 'GHS',
                              minimumFractionDigits: 2
                            }).format(item.price).replace('GHS', 'GH₵')}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.product_id, (item.quantity || 1) - 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors flex items-center justify-center"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity || 1}</span>
                              <button
                                onClick={() => updateQuantity(item.product_id, (item.quantity || 1) + 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors flex items-center justify-center"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Subtotal</p>
                              <p className="text-lg font-semibold text-white">
                                {new Intl.NumberFormat('en-GH', {
                                  style: 'currency',
                                  currency: 'GHS',
                                  minimumFractionDigits: 2
                                }).format(item.price * (item.quantity || 1)).replace('GHS', 'GH₵')}
                              </p>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.product_id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-2"
                              title="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 transition-colors text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold text-[#EFE554]">{formattedTotal}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#EFE554] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  href="/"
                  className="block w-full text-center bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

