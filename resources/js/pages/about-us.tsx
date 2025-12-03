import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';

export default function AboutUs() {
  return (
    <>
      <Head title="About Us - Cyperus Enterprise" />
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
                    <li className="text-white font-medium">About Us</li>
                  </ol>
                </nav>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-white space-y-6">
                <h2 className="text-3xl font-bold text-[#EFE554]">
                  About Us – Cyperus Enterprise
                </h2>
                
                <p className="text-gray-300 leading-relaxed">
                  At Cyperus Enterprise, we are passionate about exploring the endless possibilities of tigernut. Our mission is to create high-quality, healthy products while supporting local farmers and communities. Our vision is to become a leading innovator in tigernut-based foods and beverages, serving both the local and export markets.
                </p>
                
                <p className="text-white font-semibold">
                  We currently produce and export:
                </p>
                
                <div className="space-y-3 pl-4">
                  <p className="text-gray-300">
                    <span className="text-[#EFE554] font-semibold">Beverages</span> – refreshing, natural, and full of goodness.
                  </p>
                  <p className="text-gray-300">
                    <span className="text-[#EFE554] font-semibold">Raw Tigernut</span> – available in black, brown, and golden dark brown varieties for both local and international markets.
                  </p>
                  <p className="text-gray-300">
                    <span className="text-[#EFE554] font-semibold">Poultry Feed</span> – nutritious by-products to support livestock farmers.
                  </p>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  By harnessing the potential of tigernut, we aim to bring health, innovation, and economic growth to the communities we work with, while delivering quality products that customers love around the world.
                </p>
              </div>
              
              {/* Image */}
              <div className="relative aspect-square">
                <img 
                  src="/images/clients/hero/slider1.JPG" 
                  alt="Cyperus Enterprise"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-5xl font-bold text-[#EFE554] mb-2">10+</div>
                <p className="text-white text-lg">Years of Experience</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-[#EFE554] mb-2">1000+</div>
                <p className="text-white text-lg">Happy Customers</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-[#EFE554] mb-2">6</div>
                <p className="text-white text-lg">Product Varieties</p>
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

