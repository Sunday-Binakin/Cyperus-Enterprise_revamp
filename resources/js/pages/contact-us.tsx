import { Head, useForm, usePage } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function ContactUs() {
  const { flash } = usePage().props as any;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  // Show success message from backend
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, {
        duration: 4000,
        style: {
          background: '#4A651F',
          color: 'white',
          border: '1px solid #EFE554',
        },
      });
    }
  }, [flash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post('/contact', {
      onSuccess: () => {
        reset();
      },
      onError: (errors) => {
        console.error('Form errors:', errors);
        if (errors.message) {
          toast.error(errors.message as string);
        }
      },
    });
  };

  return (
    <>
      <Head title="Contact Us - Cyperus Enterprise" />
      <Header />
      <main className="bg-black">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/clients/hero/slider1.JPG')" }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative h-full flex flex-col justify-center text-white px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-left">
                <nav className="mb-4">
                  <ol className="flex items-center space-x-2 text-sm text-gray-200">
                    <li><a href="/" className="hover:text-white text-gray-300">Home</a></li>
                    <li><span className="mx-2">›</span></li>
                    <li className="text-white font-medium">Contact Us</li>
                  </ol>
                </nav>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Get In Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your Name *"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Your Email *"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={data.subject}
                    onChange={(e) => setData('subject', e.target.value)}
                    placeholder="Subject *"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="Phone Number (Optional)"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="company"
                  value={data.company}
                  onChange={(e) => setData('company', e.target.value)}
                  placeholder="Company Name (Optional)"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  placeholder="Your Message *"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A651F]"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-[#4A651F] text-white font-semibold rounded-lg hover:bg-[#3a4f18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-gray-300">Amrahia, Accra, Ghana</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">info@cyperusenterprise.com</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+233 50 432 1995</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

