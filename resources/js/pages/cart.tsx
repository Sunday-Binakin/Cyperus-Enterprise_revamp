import { useCart } from '@/store/cartHooks';
import { router, Link } from '@inertiajs/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart, getTotalItems } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  
  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    router.visit('/checkout');
  };

  const formattedTotal = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(totalPrice).replace('GHS', 'GH₵');

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      updateQuantity(productId, newQuantity);
      toast.success('Quantity updated');
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-600 mb-6" />
              <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-md mx-auto">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="block w-full bg-[#EFE554] text-black py-4 px-6 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors text-center"
                >
                  Start Shopping
                </Link>
                <Link
                  href="/products"
                  className="block w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center border border-gray-700"
                >
                  Browse Products
                </Link>
              </div>
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
      <div className="min-h-screen bg-black text-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold mt-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
          
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
                                onClick={() => handleQuantityUpdate(item.product_id, (item.quantity || 1) - 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={(item.quantity || 1) <= 1 || updatingItems.has(item.product_id)}
                              >
                                {updatingItems.has(item.product_id) ? (
                                  <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Minus size={16} />
                                )}
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity || 1}</span>
                              <button
                                onClick={() => handleQuantityUpdate(item.product_id, (item.quantity || 1) + 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={updatingItems.has(item.product_id)}
                              >
                                {updatingItems.has(item.product_id) ? (
                                  <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Plus size={16} />
                                )}
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
                              onClick={() => handleRemoveItem(item.product_id)}
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
                      onClick={handleClearCart}
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
                <h2 className="text-xl font-semibold mb-6 text-white">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="text-white font-medium">{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-xl font-bold text-[#EFE554]">{formattedTotal}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-[#EFE554] text-black py-4 px-6 rounded-lg font-semibold hover:bg-[#dbd348] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                  
                  <Link
                    href="/"
                    className="block w-full text-center bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure checkout with Paystack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

