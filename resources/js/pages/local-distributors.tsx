import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { HeroSection } from '@/components/features/pages/hero-section';

export default function LocalDistributors() {
  return (
    <>
      <Head title="Local Distributors - Cyperus Enterprise" />
      <Header />
      
      {/* Hero Section - Direct CSS approach like export department */}
      <div 
        className="relative min-h-[70vh] flex items-center"
        style={{
          backgroundImage: 'url(/images/clients/hero/slider1.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Light black overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-left">
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-gray-200">
                <li><a href="/" className="hover:text-white text-gray-300">Home</a></li>
                <li><span className="mx-2">›</span></li>
                <li className="text-white font-medium">Local Distributors</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Local Distributors
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-black min-h-screen text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-black rounded-lg p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🤝 Local Distributors
              </h1>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Join us to bring healthy tigernut products to homes and shops across Ghana.
                Enjoy wholesale prices, training, and reliable supply.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-[#4A651F] rounded-lg p-8 text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                📞 Ready to Get Started?
              </h2>
              <p className="text-white mb-6 text-lg">
                Call or WhatsApp us to become a local distributor today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+233123456789"
                  className="bg-[#EFE554] text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center"
                >
                  📞 Call Us: +233 123 456 789
                </a>
                <a
                  href="https://wa.me/233123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 inline-flex items-center justify-center"
                >
                  📱 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  💰 Wholesale Pricing
                </h3>
                <p className="text-white/80">
                  Get competitive wholesale prices on all our tigernut products, ensuring healthy profit margins for your business.
                </p>
              </div>

              <div className="bg-black rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  📚 Training & Support
                </h3>
                <p className="text-white/80">
                  We provide comprehensive training on our products, their benefits, and sales techniques to help you succeed.
                </p>
              </div>

              <div className="bg-black rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  🚚 Reliable Supply
                </h3>
                <p className="text-white/80">
                  Count on consistent product availability and timely delivery to keep your shelves stocked.
                </p>
              </div>

              <div className="bg-black rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  🎯 Marketing Support
                </h3>
                <p className="text-white/80">
                  Receive marketing materials, product displays, and promotional support to boost your sales.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-black rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Partner with Us?
              </h3>
              <p className="text-white/80 mb-6">
                Contact us today to discuss partnership opportunities and get started as a local distributor.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-black rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">📞 Phone</h4>
                  <p className="text-white/80">+233 123 456 789</p>
                </div>
                <div className="bg-black rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">📧 Email</h4>
                  <p className="text-white/80">distributors@cyperus.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

