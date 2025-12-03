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
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/admin/messages"
                style={{ color: '#6b7280', textDecoration: 'none' }}
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                Message Details
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500'
              }} className={getStatusColor(message.status)}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          {/* Message Header */}
          <div style={{ padding: '32px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#3b82f6', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                      {message.name}
                    </h2>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
                      {getTypeLabel(message.type)}
                    </p>
                  </div>
                </div>
                
                {message.subject && (
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                    {message.subject}
                  </h3>
                )}
              </div>
            </div>

            {/* Contact Information Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Mail size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Email</span>
                </div>
                <p style={{ color: '#111827', margin: 0, wordBreak: 'break-word' }}>{message.email}</p>
              </div>

              {message.phone && (
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Phone size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Phone</span>
                  </div>
                  <p style={{ color: '#111827', margin: 0 }}>{message.phone}</p>
                </div>
              )}

              {message.company && (
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Building size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Company</span>
                  </div>
                  <p style={{ color: '#111827', margin: 0 }}>{message.company}</p>
                </div>
              )}

              {message.country && (
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <User size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Location</span>
                  </div>
                  <p style={{ color: '#111827', margin: 0 }}>{message.country}</p>
                </div>
              )}

              {message.business_type && (
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Building size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Business Type</span>
                  </div>
                  <p style={{ color: '#111827', margin: 0 }}>{message.business_type}</p>
                </div>
              )}

              <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Calendar size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Received</span>
                </div>
                <p style={{ color: '#111827', margin: 0 }}>
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
          <div style={{ padding: '32px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
              Message Content
            </h4>
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <p style={{ 
                color: '#111827', 
                lineHeight: '1.6', 
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {message.message}
              </p>
            </div>
          </div>

          {/* Additional Details for Distributor/Export inquiries */}
          {message.additional_data && (message.type === 'distributor' || message.type === 'export') && (
            <div style={{ padding: '32px', borderTop: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                {message.type === 'distributor' ? 'Distributor Details' : 'Export Details'}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                
                {/* Distributor specific fields */}
                {message.type === 'distributor' && (
                  <>
                    {message.additional_data.business_years && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Years in Business
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>{message.additional_data.business_years}</p>
                      </div>
                    )}
                    
                    {message.additional_data.currently_distributing && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Currently Distributing
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>
                          {message.additional_data.currently_distributing === 'yes' ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.current_brands && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Current Brands
                        </span>
                        <p style={{ color: '#111827', margin: 0, whiteSpace: 'pre-wrap' }}>{message.additional_data.current_brands}</p>
                      </div>
                    )}
                    
                    {message.additional_data.interested_products && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Interested Products
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>
                          {Array.isArray(message.additional_data.interested_products) 
                            ? message.additional_data.interested_products.join(', ')
                            : message.additional_data.interested_products
                          }
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.monthly_quantity && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Monthly Quantity
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>{message.additional_data.monthly_quantity}</p>
                      </div>
                    )}
                    
                    {message.additional_data.packaging_preference && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Packaging Preference
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>{message.additional_data.packaging_preference}</p>
                      </div>
                    )}
                    
                    {message.additional_data.import_experience && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Import Experience
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>
                          {message.additional_data.import_experience === 'yes' ? 'Yes' : 'No'}
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.shipping_method && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Preferred Shipping Method
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>{message.additional_data.shipping_method}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Export specific fields */}
                {message.type === 'export' && (
                  <>
                    {message.additional_data.products_interested && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Products Interested
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>
                          {Array.isArray(message.additional_data.products_interested) 
                            ? message.additional_data.products_interested.join(', ')
                            : message.additional_data.products_interested
                          }
                        </p>
                      </div>
                    )}
                    
                    {message.additional_data.order_quantity && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Order Quantity
                        </span>
                        <p style={{ color: '#111827', margin: 0 }}>{message.additional_data.order_quantity}</p>
                      </div>
                    )}
                    
                    {message.additional_data.additional_info && (
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', gridColumn: '1 / -1' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                          Additional Information
                        </span>
                        <p style={{ color: '#111827', margin: 0, whiteSpace: 'pre-wrap' }}>{message.additional_data.additional_info}</p>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>
          )}

          {/* Message Status Info */}
          {(message.read_at || message.reader) && (
            <div style={{ padding: '24px 32px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                Status Information
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                {message.read_at && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} style={{ color: '#10b981' }} />
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
          <div style={{ padding: '24px 32px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => router.post(`/admin/messages/${message.id}/mark-read`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Mark as Read
              </button>
              <Link
                href="/admin/messages"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
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