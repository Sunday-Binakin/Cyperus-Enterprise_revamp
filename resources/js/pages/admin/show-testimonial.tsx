import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Edit2, Calendar, User, Building, CheckCircle, XCircle } from 'lucide-react';

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
  creator?: {
    name: string;
  };
  updater?: {
    name: string;
  };
}

interface Props {
  testimonial: Testimonial;
}

export default function ShowTestimonial({ testimonial }: Props) {
  return (
    <AdminLayout>
      <Head title={`Testimonial - ${testimonial.name}`} />
      
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/admin/testimonials"
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Testimonial Details</h1>
            </div>
            <Link
              href={`/admin/testimonials/${testimonial.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit2 className="mr-2" size={16} />
              Edit
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Testimonial Card */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {testimonial.image ? (
                  <img
                    src={`/storage/${testimonial.image}`}
                    alt={testimonial.name}
                    className="h-24 w-24 object-cover rounded-full border-4 border-gray-200"
                  />
                ) : (
                  <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center border-4 border-gray-200">
                    <span className="text-gray-600 font-medium text-xl">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{testimonial.name}</h2>
                <p className="text-lg text-gray-600 mb-1">{testimonial.title}</p>
                <p className="text-lg text-blue-600 font-medium mb-3">{testimonial.company}</p>
                
                {/* Status Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  testimonial.is_active 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {testimonial.is_active ? (
                    <>
                      <CheckCircle className="mr-1" size={14} />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1" size={14} />
                      Inactive
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="border-l-4 border-blue-500 pl-6 mb-8">
              <blockquote className="text-lg text-gray-800 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              
              {/* Sort Order */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Sort Order</h3>
                <p className="text-gray-600">#{testimonial.sort_order}</p>
              </div>

              {/* Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Display Status</h3>
                <p className={`font-medium ${testimonial.is_active ? 'text-green-600' : 'text-yellow-600'}`}>
                  {testimonial.is_active ? 'Visible on website' : 'Hidden from website'}
                </p>
              </div>

              {/* Created */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Created
                </h3>
                <p className="text-gray-600">{new Date(testimonial.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                {testimonial.creator && (
                  <p className="text-sm text-gray-500 mt-1">by {testimonial.creator.name}</p>
                )}
              </div>

              {/* Updated */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Last Updated
                </h3>
                <p className="text-gray-600">{new Date(testimonial.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                {testimonial.updater && (
                  <p className="text-sm text-gray-500 mt-1">by {testimonial.updater.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            href="/admin/testimonials"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            ← Back to Testimonials
          </Link>
          
          <div className="space-x-3">
            <Link
              href={`/admin/testimonials/${testimonial.id}/edit`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Testimonial
            </Link>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}