import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessProps {
  order: {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    total: string;
    items: Array<{
      id: number;
      product_name: string;
      quantity: number;
      unit_price: string;
      total_price: string;
    }>;
  };
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  return (
    <>
      <Head title="Order Successful" />
      <Header />
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
            <p className="text-gray-400">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span className="font-semibold">{order.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{order.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total:</span>
                <span className="text-amber-500 font-semibold">
                  GH₵{parseFloat(order.total).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    GH₵{parseFloat(item.total_price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
