import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id?: number;
  name: string;
  slug?: string;
  category_id: number | string;
  description: string;
  price: number | string;
  compare_price?: number | string;
  stock: number | string;
  weight?: string;
  is_featured: boolean;
  is_active: boolean;
  image?: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product | null;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const isEditing = !!product;
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image || null
  );

  const { data, setData, post, processing, errors } = useForm<Product & {image: File | null}>({
    name: product?.name || '',
    category_id: product?.category_id || '',
    description: product?.description || '',
    price: product?.price || '',
    compare_price: product?.compare_price || '',
    stock: product?.stock || '',
    weight: product?.weight || '',
    is_featured: product?.is_featured || false,
    is_active: product?.is_active !== false,
    image: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isEditing && product?.id) {
      // Build FormData manually with _method for Laravel
      const formData = new FormData();
      formData.append('_method', 'PUT');
      
      // Append all form fields
      formData.append('name', data.name);
      formData.append('category_id', String(data.category_id));
      formData.append('description', data.description || '');
      formData.append('price', String(data.price));
      formData.append('compare_price', String(data.compare_price || ''));
      formData.append('stock', String(data.stock));
      formData.append('weight', data.weight || '');
      formData.append('is_featured', data.is_featured ? '1' : '0');
      formData.append('is_active', data.is_active ? '1' : '0');
      
      // Append image only if a new file was selected
      if (data.image instanceof File) {
        formData.append('image', data.image);
      }
      
      // Use router.post for more control
      router.post(`/admin/products/${product.id}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          // Success handled by redirect from controller
        },
        onError: (errors) => {
          console.error('Update errors:', errors);
        },
      });
    } else {
      post('/admin/products', {
        forceFormData: true,
      });
    }
  };

  const removeImage = () => {
    setData('image', null);
    setImagePreview(null);
  };

  return (
    <AdminLayout>
      <Head title={isEditing ? 'Edit Product' : 'Add New Product'} />
      
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Original Tigernut Drink (500ml)"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="" className="text-gray-500">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="text-gray-900">
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Describe your product..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pricing & Stock
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (GH₵) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="20.00"
                    required
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                {/* Compare Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare Price (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.compare_price}
                    onChange={(e) => setData('compare_price', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="25.00"
                  />
                  {errors.compare_price && (
                    <p className="mt-1 text-sm text-red-600">{errors.compare_price}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="100"
                    required
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight/Size
                  </label>
                  <input
                    type="text"
                    value={data.weight}
                    onChange={(e) => setData('weight', e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="500ml"
                  />
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Product Image
              </h2>

              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Settings
              </h2>

              <div className="space-y-4">
                {/* Is Featured */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.is_featured}
                    onChange={(e) => setData('is_featured', e.target.checked)}
                    className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Featured Product</p>
                    <p className="text-sm text-gray-500">Display this product on the homepage</p>
                  </div>
                </label>

                {/* Is Active */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Active</p>
                    <p className="text-sm text-gray-500">Make this product visible to customers</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/admin/products"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {processing
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Product'
                  : 'Create Product'}
              </button>
            </div>
          </form>
        </main>
    </AdminLayout>
  );
}

