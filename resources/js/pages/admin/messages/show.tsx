import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Mail, Phone, Building2, Calendar, User, Trash2 } from 'lucide-react';

interface Message {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  read_at: string | null;
  created_at: string;
  reader?: {
    name: string;
    email: string;
  };
}

interface Props {
  message: Message;
}

export default function MessageShow({ message }: Props) {
  const updateStatus = (status: string) => {
    router.post(`/admin/messages/${message.id}/status`, {
      status,
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this message?')) {
      router.delete(`/admin/messages/${message.id}`);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      unread: 'text-blue-400',
      read: 'text-gray-400',
      replied: 'text-green-400',
      archived: 'text-yellow-400',
    };
    return colors[status as keyof typeof colors] || colors.unread;
  };

  return (
    <AdminLayout>
      <Head title={`Message from ${message.name} - Admin`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/messages"
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">{message.subject || 'No Subject'}</h1>
              <p className="text-gray-400 mt-1">
                Message from {message.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Message Details */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {/* Sender Info */}
          <div className="p-6 border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-medium">{message.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      {message.email}
                    </a>
                  </div>
                </div>

                {message.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <a
                        href={`tel:${message.phone}`}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        {message.phone}
                      </a>
                    </div>
                  </div>
                )}

                {message.company && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-400">Company</p>
                      <p className="text-white">{message.company}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-400">Received</p>
                    <p className="text-white">
                      {new Date(message.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Status</p>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(message.status)}`}>
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </span>
                </div>

                {message.read_at && message.reader && (
                  <div>
                    <p className="text-sm text-gray-400">Read by</p>
                    <p className="text-white">
                      {message.reader.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.read_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Message</h3>
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-800 bg-gray-800/50">
            <div className="flex items-center gap-4">
              <p className="text-gray-400 font-medium">Update Status:</p>
              <button
                onClick={() => updateStatus('read')}
                disabled={message.status === 'read'}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus('replied')}
                disabled={message.status === 'replied'}
                className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Replied
              </button>
              <button
                onClick={() => updateStatus('archived')}
                disabled={message.status === 'archived'}
                className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

