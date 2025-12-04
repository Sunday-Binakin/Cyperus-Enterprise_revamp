import { Link } from '@inertiajs/react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  image?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

// Testimonials loaded from database only

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-96">
      <img 
        src={testimonial.image || '/images/clients/testimonial/default.jpg'}
        alt={testimonial.name}
        className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.src = '/images/clients/testimonial/default.jpg';
          e.currentTarget.onerror = null;
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <span 
          className="text-white text-xs px-3 py-1 rounded-full self-start mb-3 bg-green-600"
        >
          Customer Story
        </span>
        <h3 className="text-2xl font-bold mb-2 line-clamp-2">{testimonial.name}</h3>
        <p className="text-sm text-[#EFE554] mb-2">{testimonial.title}</p>
        <p className="text-xs text-gray-400 mb-3">{testimonial.company}</p>
        <p className="text-gray-300 mb-4 line-clamp-3 italic relative">
          <span className="text-[#EFE554] text-2xl absolute -top-2 -left-1">&ldquo;</span>
          <span className="ml-3">{testimonial.content}</span>
          <span className="text-[#EFE554] text-2xl">&rdquo;</span>
        </p>
      </div>
    </div>
  </div>
);

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
  // Only show testimonials if they exist in the database
  if (testimonials.length === 0) {
    return null; // Hide the section if no testimonials
  }

  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-white mb-2">TESTIMONIALS</h2>
          <h3 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h3>
          <div className="w-20 h-1 bg-[#4A651F] mx-auto"></div>
        </div>
        
        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

