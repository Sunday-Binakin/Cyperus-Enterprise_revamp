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
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Link
              href="/admin/products/create"
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <Link
                href="/admin/products"
                className="text-sm text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                View all products →
              </Link>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <Link
                href="/admin/orders"
                className="text-sm text-green-600 hover:text-green-800 mt-4 inline-block"
              >
                View all orders →
              </Link>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    GH₵{stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">From all time sales</p>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {stats.lowStockProducts}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Package className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <Link
                href="/admin/products?filter=low-stock"
                className="text-sm text-red-600 hover:text-red-800 mt-4 inline-block"
              >
                View low stock →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/products/create"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                <Package className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-900">Add New Product</p>
                  <p className="text-sm text-gray-500">Create a new product listing</p>
                </div>
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Manage Categories</p>
                  <p className="text-sm text-gray-500">Organize product categories</p>
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">View Orders</p>
                  <p className="text-sm text-gray-500">Check recent orders</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
    </AdminLayout>
  );
}

