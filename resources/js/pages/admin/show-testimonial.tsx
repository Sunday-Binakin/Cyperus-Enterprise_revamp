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
              <h1 className="text-3xl font-bold text-white">Testimonial Details</h1>
            </div>
            <Link
              href={`/admin/testimonials/${testimonial.id}/edit`}
              className="px-4 py-2 bg-[#4A651F] text-white rounded-lg hover:bg-[#5a7626] flex items-center transition-colors"
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
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {testimonial.image ? (
                  <img
                    src={`/storage/${testimonial.image}`}
                    alt={testimonial.name}
                    className="h-24 w-24 object-cover rounded-full border-4 border-white/20"
                  />
                ) : (
                  <div className="h-24 w-24 bg-[#4A651F]/20 rounded-full flex items-center justify-center border-4 border-white/20">
                    <span className="text-white font-medium text-xl">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{testimonial.name}</h2>
                <p className="text-lg text-gray-300 mb-1">{testimonial.title}</p>
                <p className="text-lg text-[#4A651F] font-medium mb-3">{testimonial.company}</p>
                
                {/* Status Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  testimonial.is_active 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
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
            <div className="border-l-4 border-[#4A651F] pl-6 mb-8">
              <blockquote className="text-lg text-gray-300 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
              
              {/* Sort Order */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2">Sort Order</h3>
                <p className="text-gray-400">#{testimonial.sort_order}</p>
              </div>

              {/* Status */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2">Display Status</h3>
                <p className={`font-medium ${testimonial.is_active ? 'text-green-400' : 'text-yellow-400'}`}>
                  {testimonial.is_active ? 'Visible on website' : 'Hidden from website'}
                </p>
              </div>

              {/* Created */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Created
                </h3>
                <p className="text-gray-400">{new Date(testimonial.created_at).toLocaleDateString('en-US', {
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
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Last Updated
                </h3>
                <p className="text-gray-400">{new Date(testimonial.updated_at).toLocaleDateString('en-US', {
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
            className="px-6 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
          >
            ← Back to Testimonials
          </Link>
          
          <div className="space-x-3">
            <Link
              href={`/admin/testimonials/${testimonial.id}/edit`}
              className="px-6 py-2 bg-[#4A651F] text-white rounded-lg hover:bg-[#5a7626] transition-colors"
            >
              Edit Testimonial
            </Link>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}