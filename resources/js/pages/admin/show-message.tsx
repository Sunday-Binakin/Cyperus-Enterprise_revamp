import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Mail, User, Building, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Message {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  business_type: string | null;
  subject: string | null;
  message: string;
  additional_data: any | null;
  status: string;
  read_at: string | null;
  created_at: string;
  reader?: {
    name: string;
  };
}

interface Props {
  message: Message;
}

export default function ShowMessage({ message }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-500/20 text-red-400';
      case 'read':
        return 'bg-blue-500/20 text-blue-400';
      case 'replied':
        return 'bg-green-500/20 text-green-400';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'contact':
        return 'Contact Us';
      case 'distributor':
        return 'Distributor Inquiry';
      case 'export':
        return 'Export Inquiry';
      default:
        return 'Message';
    }
  };

  return (
    <AdminLayout>
      <Head title={`Message from ${message.name}`} />
      
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/messages"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-white">
                Message Details
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status)}`}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
          
          {/* Message Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#4A651F] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {message.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {getTypeLabel(message.type)}
                    </p>
                  </div>
                </div>
                
                {message.subject && (
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    {message.subject}
                  </h3>
                )}
              </div>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-400">Email</span>
                </div>
                <p className="text-white break-words">{message.email}</p>
              </div>

              {message.phone && (
                <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Phone</span>
                  </div>
                  <p className="text-white">{message.phone}</p>
                </div>
              )}

              {message.company && (
                <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Company</span>
                  </div>
                  <p className="text-white">{message.company}</p>
                </div>
              )}

              {message.country && (
                <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Location</span>
                  </div>
                  <p className="text-white">{message.country}</p>
                </div>
              )}

              {message.business_type && (
                <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Business Type</span>
                  </div>
                  <p className="text-white">{message.business_type}</p>
                </div>
              )}

              <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-400">Received</span>
                </div>
                <p className="text-white">
                  {new Date(message.created_at).toLocaleDateString('en-US', {
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

          {/* Message Content */}
          <div className="p-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Message Content
            </h4>
            <div className="bg-black/30 border-l-4 border-[#4A651F] p-5 rounded-lg">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {message.message}
              </p>
            </div>
          </div>

          {/* Additional Details for Distributor/Export inquiries */}
          {message.additional_data && (message.type === 'distributor' || message.type === 'export') && (
            <div className="p-8 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                {message.type === 'distributor' ? 'Distributor Details' : 'Export Details'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Distributor specific fields */}
                {message.type === 'distributor' && (
                  <>
                    {message.additional_data.business_years && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Years in Business
                        </span>
                        <p className="text-white">{message.additional_data.business_years}</p>
                      </div>
                    )}
                    
                    {message.additional_data.currently_distributing && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Currently Distributing
                        </span>
                        <p className="text-white">
                          {message.additional_data.currently_distributing === 'yes' ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.current_brands && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Current Brands
                        </span>
                        <p className="text-white whitespace-pre-wrap">{message.additional_data.current_brands}</p>
                      </div>
                    )}
                    
                    {message.additional_data.interested_products && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Interested Products
                        </span>
                        <p className="text-white">
                          {Array.isArray(message.additional_data.interested_products) 
                            ? message.additional_data.interested_products.join(', ')
                            : message.additional_data.interested_products
                          }
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.monthly_quantity && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Monthly Quantity
                        </span>
                        <p className="text-white">{message.additional_data.monthly_quantity}</p>
                      </div>
                    )}
                    
                    {message.additional_data.packaging_preference && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Packaging Preference
                        </span>
                        <p className="text-white">{message.additional_data.packaging_preference}</p>
                      </div>
                    )}
                    
                    {message.additional_data.import_experience && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Import Experience
                        </span>
                        <p className="text-white">
                          {message.additional_data.import_experience === 'yes' ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.shipping_method && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Preferred Shipping Method
                        </span>
                        <p className="text-white">{message.additional_data.shipping_method}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Export specific fields */}
                {message.type === 'export' && (
                  <>
                    {message.additional_data.products_interested && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Products Interested
                        </span>
                        <p className="text-white">
                          {Array.isArray(message.additional_data.products_interested) 
                            ? message.additional_data.products_interested.join(', ')
                            : message.additional_data.products_interested
                          }
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.order_quantity && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Order Quantity
                        </span>
                        <p className="text-white">{message.additional_data.order_quantity}</p>
                      </div>
                    )}
                    
                    {message.additional_data.additional_info && (
                      <div className="bg-black/30 border border-white/10 p-4 rounded-lg col-span-full">
                        <span className="text-sm font-medium text-gray-400 block mb-1">
                          Additional Information
                        </span>
                        <p className="text-white whitespace-pre-wrap">{message.additional_data.additional_info}</p>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>
          )}

          {/* Message Status Info */}
          {(message.read_at || message.reader) && (
            <div className="px-8 py-6 bg-white/5 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">
                Status Information
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {message.read_at && (
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-green-400" />
                    Read on {new Date(message.read_at).toLocaleDateString()}
                  </span>
                )}
                {message.reader && (
                  <span>by {message.reader.name}</span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-white/5 border-t border-white/10">
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => router.post(`/admin/messages/${message.id}/mark-read`)}
                className="px-4 py-2 bg-[#4A651F] hover:bg-[#5a7626] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Mark as Read
              </button>
              <Link
                href="/admin/messages"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
              >
                All Messages
              </Link>
            </div>
          </div>

        </div>
      </main>
    </AdminLayout>
  );
}