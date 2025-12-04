import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  category: {
    name: string;
  };
  image: string | null;
  is_active: boolean;
  is_featured: boolean;
}

interface ProductsIndexProps {
  products: {
    data: Product[];
    links: any[];
    meta: any;
  };
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setDeleting(id);
      router.delete(`/admin/products/${id}`, {
        onFinish: () => setDeleting(null),
      });
    }
  };

  const toggleStatus = (id: number) => {
    router.post(`/admin/products/${id}/toggle-status`);
  };

  return (
    <AdminLayout>
      <Head title="Manage Products" />
      
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Manage Products</h1>
            <Link
              href="/admin/products/create"
              className="flex items-center gap-2 px-6 py-3 bg-[#4A651F] text-white rounded-lg hover:bg-[#5a7626] font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Products Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.data.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-4">
                          <p className="text-lg">No products found</p>
                          <Link
                            href="/admin/products/create"
                            className="text-[#4A651F] hover:text-[#5a7626] font-semibold transition-colors"
                          >
                            Add your first product →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.data.map((product) => (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              {product.image ? (
                                <img
                                  className="h-12 w-12 rounded object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-12 w-12 rounded bg-white/10 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">No image</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {product.name}
                              </div>
                              {product.is_featured && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EFE554]/20 text-[#EFE554]">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300">{product.category.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-white">
                            GH₵{parseFloat(product.price.toString()).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.stock < 20
                                ? 'bg-red-500/20 text-red-400'
                                : product.stock < 50
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleStatus(product.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              product.is_active
                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                            }`}
                          >
                            {product.is_active ? (
                              <>
                                <Eye className="w-3 h-3" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              disabled={deleting === product.id}
                              className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded disabled:opacity-50 transition-colors"
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
            {products.data.length > 0 && products.meta && products.links && (
              <div className="bg-white/5 px-4 py-3 border-t border-white/10 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">
                    Showing <span className="font-medium">{products.meta.from || 1}</span> to{' '}
                    <span className="font-medium">{products.meta.to || 0}</span> of{' '}
                    <span className="font-medium">{products.meta.total || 0}</span> products
                  </div>
                  <div className="flex gap-2">
                    {products.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-1 rounded transition-colors ${
                          link.active
                            ? 'bg-[#4A651F] text-white'
                            : link.url
                            ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                            : 'bg-white/5 text-gray-600 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
    </AdminLayout>
  );
}

