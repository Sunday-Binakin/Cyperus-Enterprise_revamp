import { Head, Link } from '@inertiajs/react';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface DashboardProps {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockProducts: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  // Check if stats is undefined or null
  if (!stats) {
    console.error('Stats prop is undefined or null');
    return (
      <AdminLayout>
        <Head title="Admin Dashboard" />
        <div className="p-8">
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded">
            <strong>Error:</strong> Dashboard statistics could not be loaded.
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <Link
              href="/admin/products/create"
              className="px-6 py-2 bg-[#4A651F] text-white rounded-lg hover:bg-[#5a7626] font-semibold transition-colors"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Products */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Products</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <Link
                href="/admin/products"
                className="text-sm text-blue-400 hover:text-blue-300 mt-4 inline-block transition-colors"
              >
                View all products →
              </Link>
            </div>

            {/* Total Orders */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Orders</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <Link
                href="/admin/orders"
                className="text-sm text-green-400 hover:text-green-300 mt-4 inline-block transition-colors"
              >
                View all orders →
              </Link>
            </div>

            {/* Total Revenue */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    GH₵{stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-[#EFE554]/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#EFE554]" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">From all time sales</p>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Low Stock Items</p>
                  <p className="text-3xl font-bold text-red-400 mt-2">
                    {stats.lowStockProducts}
                  </p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Package className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <Link
                href="/admin/products?filter=low-stock"
                className="text-sm text-red-400 hover:text-red-300 mt-4 inline-block transition-colors"
              >
                View low stock →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/products/create"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-[#4A651F] hover:bg-[#4A651F]/10 transition-colors"
              >
                <Package className="w-6 h-6 text-[#4A651F]" />
                <div>
                  <p className="font-semibold text-white">Add New Product</p>
                  <p className="text-sm text-gray-400">Create a new product listing</p>
                </div>
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-colors"
              >
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="font-semibold text-white">Manage Categories</p>
                  <p className="text-sm text-gray-400">Organize product categories</p>
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-green-400 hover:bg-green-500/10 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-white">View Orders</p>
                  <p className="text-sm text-gray-400">Check recent orders</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
    </AdminLayout>
  );
}

