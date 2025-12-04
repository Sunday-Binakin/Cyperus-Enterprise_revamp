import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState } from 'react';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function EditTestimonial({ testimonial }: Props) {
  const [formData, setFormData] = useState({
    name: testimonial.name,
    title: testimonial.title,
    company: testimonial.company,
    content: testimonial.content,
    image: null as File | null,
    is_active: testimonial.is_active,
    sort_order: testimonial.sort_order,
  });
  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === 'is_active') {
          submitData.append(key, value ? '1' : '0');
        } else if (key === 'image' && value instanceof File) {
          submitData.append(key, value);
        } else {
          submitData.append(key, value.toString());
        }
      }
    });

    submitData.append('_method', 'PATCH');

    router.post(`/admin/testimonials/${testimonial.id}`, submitData, {
      onSuccess: () => {
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title={`Edit Testimonial - ${testimonial.name}`} />
      
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/admin/testimonials"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-3xl font-bold text-white">Edit Testimonial</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                />
                {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sort Order
                </label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                />
                {errors.sort_order && <p className="text-red-400 text-sm mt-1">{errors.sort_order}</p>}
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Testimonial Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="Enter the testimonial content..."
                  required
                />
                {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content}</p>}
              </div>

              {/* Current Image & Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center px-4 py-2 border border-white/20 bg-black/30 rounded-lg cursor-pointer hover:bg-white/10 text-white transition-colors">
                    <Upload className="mr-2" size={16} />
                    {testimonial.image ? 'Change Image' : 'Choose Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  
                  {/* Current Image */}
                  {testimonial.image && !imagePreview && (
                    <div className="relative">
                      <img
                        src={`/storage/${testimonial.image}`}
                        alt={testimonial.name}
                        className="h-20 w-20 object-cover rounded-lg border-2 border-white/20"
                      />
                      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#4A651F] text-white text-xs px-2 py-1 rounded">
                        Current
                      </span>
                    </div>
                  )}
                  
                  {/* New Image Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="New Preview"
                        className="h-20 w-20 object-cover rounded-lg border-2 border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: null }));
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        New
                      </span>
                    </div>
                  )}
                </div>
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#4A651F] focus:ring-[#EFE554] border-white/20 rounded bg-black/30"
                  />
                  <span className="text-sm font-medium text-gray-300">Active</span>
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Active testimonials will be displayed on the website
                </p>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Link
              href="/admin/testimonials"
              className="px-6 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 bg-[#4A651F] text-white rounded-lg hover:bg-[#5a7626] disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              <Save className="mr-2" size={16} />
              {processing ? 'Updating...' : 'Update Testimonial'}
            </button>
          </div>
        </form>
      </main>
    </AdminLayout>
  );
}