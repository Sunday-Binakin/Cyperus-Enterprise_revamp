import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar, Truck, Phone, Mail, Edit } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: string;
  total_price: string;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_postal_code: string;
  subtotal: string;
  shipping_fee: string;
  tax: string;
  total: string;
  payment_method: string;
  payment_status: string;
  payment_reference: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  paid_at: string | null;
  delivered_at: string | null;
  items: OrderItem[];
}

interface Props {
  order: Order;
}

export default function ShowOrder({ order }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      paid: 'bg-green-500/20 text-green-400',
      failed: 'bg-red-500/20 text-red-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const handleStatusUpdate = async () => {
    const { value: newStatus } = await Swal.fire({
      title: 'Update Order Status',
      input: 'select',
      inputOptions: {
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
      },
      inputValue: order.status,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#4A651F',
      cancelButtonColor: '#6b7280',
      background: '#1f2937',
      color: '#fff',
      inputPlaceholder: 'Select status',
      customClass: {
        popup: 'border border-white/10',
        input: 'swal2-dark-input',
      },
      didOpen: () => {
        // Style the select dropdown for dark theme
        const select = document.querySelector('.swal2-select') as HTMLSelectElement;
        if (select) {
          select.style.backgroundColor = '#374151';
          select.style.color = '#fff';
          select.style.border = '1px solid rgba(255, 255, 255, 0.2)';
          select.style.padding = '8px 12px';
          
          // Style the options
          const options = select.querySelectorAll('option');
          options.forEach((option) => {
            (option as HTMLOptionElement).style.backgroundColor = '#374151';
            (option as HTMLOptionElement).style.color = '#fff';
          });
        }
      },
    });

    if (newStatus && newStatus !== order.status) {
      setIsUpdating(true);
      router.post(
        `/admin/orders/${order.id}/status`,
        { status: newStatus },
        {
          onSuccess: () => {
            Swal.fire({
              title: 'Success!',
              text: 'Order status updated successfully',
              icon: 'success',
              confirmButtonColor: '#4A651F',
              background: '#1f2937',
              color: '#fff',
              customClass: {
                popup: 'border border-white/10',
              },
            });
          },
          onError: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update order status',
              icon: 'error',
              confirmButtonColor: '#dc2626',
              background: '#1f2937',
              color: '#fff',
              customClass: {
                popup: 'border border-white/10',
              },
            });
          },
          onFinish: () => setIsUpdating(false),
        }
      );
    }
  };

  return (
    <AdminLayout>
      <Head title={`Order ${order.order_number}`} />

      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/orders"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Order {order.order_number}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-[#4A651F] hover:bg-[#5a7626] text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Edit size={16} />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Order Items & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Items */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#EFE554]" />
                  <h2 className="text-lg font-semibold text-white">Order Items</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-white/10">
                      <div className="w-20 h-20 flex-shrink-0">
                        {item.product_image ? (
                          <img
                            src={`/storage/${item.product_image.replace('uploads/', '')}`}
                            alt={item.product_name}
                            className="h-20 w-20 rounded-lg object-cover border border-white/20"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-lg bg-white/10 flex items-center justify-center text-gray-500">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.product_name}</h3>
                        <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-400">Price: GH₵{parseFloat(item.unit_price).toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">
                          GH₵{parseFloat(item.total_price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>GH₵{parseFloat(order.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping Fee</span>
                    <span>GH₵{parseFloat(order.shipping_fee).toFixed(2)}</span>
                  </div>
                  {parseFloat(order.tax) > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>GH₵{parseFloat(order.tax).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span>GH₵{parseFloat(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Order Notes</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}

          </div>

          {/* Right Column - Customer & Delivery Info */}
          <div className="space-y-6">
            
            {/* Customer Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#EFE554]" />
                  <h2 className="text-lg font-semibold text-white">Customer Information</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Name</p>
                  <p className="text-white font-medium">{order.customer_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-white break-words">{order.customer_email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <p className="text-white">{order.customer_phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#EFE554]" />
                  <h2 className="text-lg font-semibold text-white">Delivery Address</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-gray-300">
                  <p className="font-medium text-white">{order.customer_name}</p>
                  <p>{order.shipping_address}</p>
                  <p>
                    {order.shipping_city}
                    {order.shipping_state && `, ${order.shipping_state}`}
                  </p>
                  {order.shipping_postal_code && <p>{order.shipping_postal_code}</p>}
                  <p className="font-medium">{order.shipping_country}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#EFE554]" />
                  <h2 className="text-lg font-semibold text-white">Payment Information</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                  <p className="text-white font-medium capitalize">{order.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Payment Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
                {order.payment_reference && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Reference</p>
                    <p className="text-white font-mono text-sm">{order.payment_reference}</p>
                  </div>
                )}
                {order.paid_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Paid At</p>
                      <p className="text-white text-sm">
                        {new Date(order.paid_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Status */}
            {order.delivered_at && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#EFE554]" />
                    <h2 className="text-lg font-semibold text-white">Delivery Status</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Delivered At</p>
                      <p className="text-white text-sm">
                        {new Date(order.delivered_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Link
            href="/admin/orders"
            className="px-6 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
          >
            ← Back to Orders
          </Link>
        </div>
      </main>
    </AdminLayout>
  );
}

