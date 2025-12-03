import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCart } from '@/store/cartHooks';

interface CheckoutProps {
  paystack_public_key: string;
  flash?: any;
}

export default function Checkout({ paystack_public_key, flash }: CheckoutProps) {
  const { items: cartItems = [], getTotalPrice, clearCart } = useCart();
  const cartTotal = getTotalPrice ? getTotalPrice() : 0;
  const [isProcessing, setIsProcessing] = useState(false);
  const page = usePage();

  const { data, setData, post, processing, errors } = useForm({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_postal_code: '',
    items: [],
  });

  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Check for flash data on component mount (in case of redirect)
  useEffect(() => {
    const currentFlash = flash || page.props.flash;

    if (currentFlash && currentFlash.authorization_url) {
      // Redirect to Paystack payment page
      window.location.href = currentFlash.authorization_url;
    }
  }, [flash, page.props.flash]);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      setPaystackLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Paystack script');
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initializePaystackPayment = (reference: string, amount: number) => {
    // Check if Paystack is loaded
    // @ts-ignore
    if (!window.PaystackPop) {
      console.error('PaystackPop not available. Script may not have loaded.');
      alert('Payment system is loading. Please try again in a moment.');
      setIsProcessing(false);
      return;
    }

    try {
      // Check if popups are allowed
      let popupTest = null;
      try {
        popupTest = window.open('', '_blank', 'width=1,height=1');
        if (popupTest) {
          popupTest.close();
        }
      } catch (e) {
        console.warn('Popups appear to be blocked');
      }

      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: paystack_public_key,
        email: data.customer_email,
        amount: amount * 100, // Convert to kobo
        currency: 'GHS',
        ref: reference,
        channels: ['card', 'bank', 'ussd', 'mobile_money'],
        callback: function(response: any) {
          // Verify payment on backend
          window.location.href = `/payment/callback?reference=${response.reference}`;
        },
        onClose: function() {
          setIsProcessing(false);
        }
      });
      
      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack payment:', error);
      alert('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Prepare items from cart
    const items = cartItems.map(item => ({
      product_id: item.product_id || item.id,
      quantity: item.quantity,
    }));

    // Build the payload
    const payload = {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      shipping_address: data.shipping_address,
      shipping_city: data.shipping_city,
      shipping_state: data.shipping_state,
      shipping_postal_code: data.shipping_postal_code || '',
      items: items,
    };

    // Create order and get payment reference
    router.post('/checkout', payload, {
      preserveScroll: true,
      onSuccess: (page: any) => {
        
        if (flash?.payment_reference) {
          // Wait for Paystack to be loaded and a bit more time for safety
          const attemptPayment = () => {
            // @ts-ignore
            if (window.PaystackPop && paystackLoaded) {
              initializePaystackPayment(flash.payment_reference, flash.payment_amount || cartTotal);
            } else {
              setTimeout(attemptPayment, 1000);
            }
          };

          // Start attempt after a short delay
          setTimeout(attemptPayment, 500);
        } else {
          console.error('No payment reference received in flash data');
          setIsProcessing(false);
        }
      },
      onError: (errors) => {
        console.error('Checkout error:', errors);
        setIsProcessing(false);
      },
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <Head title="Checkout" />
        <Header />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <a href="/" className="text-amber-500 hover:text-amber-400">
              Continue Shopping
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head title="Checkout" />
      <Header />
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Information Form */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={data.customer_name}
                    onChange={(e) => setData('customer_name', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={data.customer_email}
                    onChange={(e) => setData('customer_email', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  />
                  {errors.customer_email && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={data.customer_phone}
                    onChange={(e) => setData('customer_phone', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={data.shipping_address}
                    onChange={(e) => setData('shipping_address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    required
                  />
                  {errors.shipping_address && (
                    <p className="text-red-500 text-sm mt-1">{errors.shipping_address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={data.shipping_city}
                      onChange={(e) => setData('shipping_city', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      required
                    />
                    {errors.shipping_city && (
                      <p className="text-red-500 text-sm mt-1">{errors.shipping_city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Region *
                    </label>
                    <input
                      type="text"
                      value={data.shipping_state}
                      onChange={(e) => setData('shipping_state', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      required
                    />
                    {errors.shipping_state && (
                      <p className="text-red-500 text-sm mt-1">{errors.shipping_state}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing || isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing || isProcessing ? 'Processing...' : `Pay GH₵${cartTotal.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems && cartItems.map((item) => (
                  <div key={item.product_id || item.id} className="flex items-center gap-4 pb-4 border-b border-gray-800">
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        GH₵{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-amber-500">GH₵{cartTotal.toFixed(2)}</span>
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
