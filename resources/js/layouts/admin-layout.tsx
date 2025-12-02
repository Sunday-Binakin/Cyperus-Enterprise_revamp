import { Link, router, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderTree,
  MessageSquare,
  BookOpen,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  Star
} from 'lucide-react';
import { useState, ReactNode } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  link?: string;
  created_at: string;
}

interface AdminData {
  unreadNotifications: number;
  unreadMessages: number;
  notifications: Notification[];
}

interface PageProps {
  admin?: AdminData | null;
}

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { admin } = usePage<PageProps>().props;

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      router.post('/logout');
    }
  };

  const totalUnread = (admin?.unreadNotifications || 0) + (admin?.unreadMessages || 0);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Blogs', href: '/admin/blogs', icon: BookOpen },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-bold text-xl">Cyperus Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = window.location.pathname === item.href || 
                             (item.href !== '/admin' && window.location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-gray-800 p-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">View Store</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-6 h-6" />
                {totalUnread > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {totalUnread > 9 ? '9+' : totalUnread}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setNotificationsOpen(false)}
                  />
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-500">{totalUnread} unread</p>
                    </div>
                    
                    {admin?.unreadMessages && admin.unreadMessages > 0 && (
                      <Link
                        href="/admin/messages"
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">New Messages</p>
                            <p className="text-sm text-gray-600">
                              You have {admin.unreadMessages} unread {admin.unreadMessages === 1 ? 'message' : 'messages'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Just now</p>
                          </div>
                        </div>
                      </Link>
                    )}

                    {admin?.notifications && admin.notifications.length > 0 ? (
                      admin.notifications.map((notification) => (
                        <Link
                          key={notification.id}
                          href={notification.link || '#'}
                          className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition"
                          onClick={() => setNotificationsOpen(false)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      !admin?.unreadMessages && (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>No new notifications</p>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-bold text-gray-900">Cyperus Admin</span>
            </div>
            
            {/* Mobile Notification Bell */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Bell className="w-6 h-6" />
              {totalUnread > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {totalUnread > 9 ? '9+' : totalUnread}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

