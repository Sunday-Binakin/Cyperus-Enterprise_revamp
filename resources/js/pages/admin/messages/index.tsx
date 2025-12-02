import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState } from 'react';
import { Mail, Search, Filter, Eye, Trash2 } from 'lucide-react';

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
}

interface Props {
  messages: {
    data: Message[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  stats: {
    total: number;
    unread: number;
    contact: number;
    distributor: number;
    export: number;
  };
  filters: {
    type?: string;
    status?: string;
    search?: string;
  };
}

export default function MessagesIndex({ messages, stats, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [typeFilter, setTypeFilter] = useState(filters.type || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');

  const handleFilter = () => {
    router.get('/admin/messages', {
      search,
      type: typeFilter,
      status: statusFilter,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      router.delete(`/admin/messages/${id}`, {
        preserveScroll: true,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      unread: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      read: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      replied: 'bg-green-500/10 text-green-400 border-green-500/20',
      archived: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${styles[status as keyof typeof styles] || styles.unread}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      contact: 'bg-purple-500/10 text-purple-400',
      distributor: 'bg-indigo-500/10 text-indigo-400',
      export: 'bg-pink-500/10 text-pink-400',
    };

    const labels = {
      contact: 'Contact Us',
      distributor: 'Distributor',
      export: 'Export Dept',
    };

    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[type as keyof typeof styles] || styles.contact}`}>
        {labels[type as keyof typeof labels] || type}
      </span>
    );
  };

  return (
    <AdminLayout>
      <Head title="Messages - Admin" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Messages</h1>
            <p className="text-gray-400 mt-1">Manage customer inquiries and messages</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Messages</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Mail className="w-8 h-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-gray-900 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-2xl font-bold text-blue-400">{stats.unread}</p>
              </div>
              <Mail className="w-8 h-8 text-blue-500/50" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contact Us</p>
                <p className="text-2xl font-bold text-white">{stats.contact}</p>
              </div>
              <Mail className="w-8 h-8 text-purple-500/50" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Distributors</p>
                <p className="text-2xl font-bold text-white">{stats.distributor}</p>
              </div>
              <Mail className="w-8 h-8 text-indigo-500/50" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Export Dept</p>
                <p className="text-2xl font-bold text-white">{stats.export}</p>
              </div>
              <Mail className="w-8 h-8 text-pink-500/50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="">All Types</option>
              <option value="contact">Contact Us</option>
              <option value="distributor">Distributor</option>
              <option value="export">Export Department</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={handleFilter}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {messages.data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No messages found
                    </td>
                  </tr>
                ) : (
                  messages.data.map((message) => (
                    <tr
                      key={message.id}
                      className={`hover:bg-gray-800/50 transition ${message.status === 'unread' ? 'bg-blue-500/5' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(message.type)}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{message.name}</p>
                          <p className="text-sm text-gray-400">{message.email}</p>
                          {message.company && (
                            <p className="text-xs text-gray-500">{message.company}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white">{message.subject || 'No subject'}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{message.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(message.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(message.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/messages/${message.id}`}
                            className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition"
                            title="View Message"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(message.id)}
                            className="p-2 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-400 transition"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {messages.last_page > 1 && (
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {messages.data.length > 0 ? ((messages.current_page - 1) * messages.per_page + 1) : 0} to{' '}
                {Math.min(messages.current_page * messages.per_page, messages.total)} of {messages.total} messages
              </div>
              <div className="flex gap-2">
                {messages.current_page > 1 && (
                  <Link
                    href={`/admin/messages?page=${messages.current_page - 1}&search=${search}&type=${typeFilter}&status=${statusFilter}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
                  >
                    Previous
                  </Link>
                )}
                {messages.current_page < messages.last_page && (
                  <Link
                    href={`/admin/messages?page=${messages.current_page + 1}&search=${search}&type=${typeFilter}&status=${statusFilter}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

