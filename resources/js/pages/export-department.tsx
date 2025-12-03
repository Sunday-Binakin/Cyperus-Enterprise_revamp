import { Head, useForm } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { HeroSection } from '@/components/features/pages/hero-section';
import { Leaf, Package, Tag, Plane, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportDepartment() {
  const { data, setData, post, processing, reset, errors } = useForm({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    productsInterested: [] as string[],
    orderQuantity: '',
    additionalInfo: ''
  });

  const productOptions = [
    'Tigernut Beverages',
    'Tigernut Snacks & Popsicles',
    'Tigernut Pulp Flour',
    'Poultry Feed'
  ];

  const businessTypes = [
    'Distributor',
    'Wholesaler',
    'Retailer',
    'Food Service',
    'Other'
  ];

  const handleCheckboxChange = (product: string) => {
    const newProducts = data.productsInterested.includes(product)
      ? data.productsInterested.filter(p => p !== product)
      : [...data.productsInterested, product];
    setData('productsInterested', newProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.productsInterested.length === 0) {
      toast.error('Please select at least one product you are interested in.');
      return;
    }

    post('/contact', {
      onSuccess: () => {
        toast.success('Thank you for your inquiry! We will contact you soon.');
        reset();
      },
      onError: () => {
        toast.error('Failed to submit inquiry. Please try again.');
      }
    });
  };

  return (
    <>
      <Head title="Export Department - Cyperus Enterprise" />
      <Header />
      
      {/* Temporary: Direct background test */}
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
                <li className="text-white font-medium">Export Department</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Export Department
            </h1>
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
        <div className="bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-16 py-16">
                
                {/* Export Info Section */}
                <div className="text-center text-white">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] mb-8">
                      🌍 Export with Us
                    </h2>
                    
                    <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-4">
                      <p>
                        Looking to bring authentic Ghanaian tigernut products to your country?
                      </p>
                      <p>
                        Cyperus Enterprise is proudly export-ready, delivering premium, naturally-processed 
                        tigernut beverages, snacks, and by-products to partners across Africa and beyond.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Export Offerings Section */}
                <div className="text-white">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] text-center mb-12">
                      What We Offer for Export
                    </h2>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EFE554] transition-colors duration-300">
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">✅</span>
                          <div>
                            <h3 className="text-xl font-semibold text-[#EFE554] mb-2">
                              Tigernut Beverages
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              Vegan-friendly, dairy-free, and nutrient-rich
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EFE554] transition-colors duration-300">
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">✅</span>
                          <div>
                            <h3 className="text-xl font-semibold text-[#EFE554] mb-2">
                              Tigernut Snacks & Popsicles
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              Tasty, natural alternatives to sugary treats
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EFE554] transition-colors duration-300">
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">✅</span>
                          <div>
                            <h3 className="text-xl font-semibold text-[#EFE554] mb-2">
                              Tigernut Pulp Flour & Poultry Feed
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              Clean, value-added by-products for baking and farming
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-black">
                  <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl border-2 border-[#4A651F]">
                        <img 
                          src="/images/clients/products/footer/choconut.jpg" 
                          alt="Ghanaian Tigernut Products" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <div>
                        <h2 className="text-4xl font-bold text-white font-serif mb-8">
                          Why <span className="text-[#EFE554]">Choose Us</span>?
                        </h2>
                        
                        <ul className="space-y-6">
                          <li className="flex items-start">
                            <div className="bg-[#EFE554] w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                              <Leaf className="text-[#4A651F]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">Farm-to-factory sourcing</h3>
                              <p className="text-white">
                                We work directly with local farmers, ensuring quality control throughout our supply chain and fair compensation.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="bg-[#EFE554] w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                              <Package className="text-[#4A651F]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">Retail-ready packaging</h3>
                              <p className="text-white">
                                Our products come in eye-catching, shelf-stable packaging that meets international standards.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="bg-[#EFE554] w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                              <Tag className="text-[#4A651F]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">Bulk/private labeling</h3>
                              <p className="text-white">
                                Flexible options for distributors, including custom branding and white-label solutions.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex items-start">
                            <div className="bg-[#EFE554] w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                              <Plane className="text-[#4A651F]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">Reliable shipping</h3>
                              <p className="text-white">
                                Experienced in international logistics with efficient shipping solutions to ensure products arrive in perfect condition.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Partnership Section */}
                <div className="text-white">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] mb-8">
                      Let&apos;s Partner
                    </h2>
                    
                    <div className="space-y-6">
                      <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        We&apos;re currently seeking international distributors, wholesalers, and retail partners.
                      </p>
                      
                      <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
                        <p className="text-lg text-white mb-4">
                          👉 Contact us at{' '}
                          <a 
                            href="mailto:export@cyperusenterprise.com" 
                            className="text-[#EFE554] hover:underline font-semibold"
                          >
                            export@cyperusenterprise.com
                          </a>
                          {' '}or fill out the export inquiry form below to start your order.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Inquiry Form */}
                <div className="text-white">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#EFE554] text-center mb-12">
                      Export Inquiry Form
                    </h2>
                    
                    <div className="bg-black rounded-lg p-8 border border-white">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={data.companyName}
                              onChange={(e) => setData('companyName', e.target.value)}
                              placeholder="Your company name"
                              required
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                            />
                            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Contact Person <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={data.contactPerson}
                              onChange={(e) => setData('contactPerson', e.target.value)}
                              placeholder="Full name"
                              required
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                            />
                            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={data.email}
                              onChange={(e) => setData('email', e.target.value)}
                              placeholder="your.email@company.com"
                              required
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={data.phone}
                              onChange={(e) => setData('phone', e.target.value)}
                              placeholder="+1 234 567 8900"
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                            />
                          </div>
                        </div>

                        {/* Business Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={data.country}
                              onChange={(e) => setData('country', e.target.value)}
                              placeholder="Your country"
                              required
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">
                              Business Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={data.businessType}
                              onChange={(e) => setData('businessType', e.target.value)}
                              required
                              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                            >
                              <option value="">Select business type</option>
                              {businessTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                          </div>
                        </div>

                        {/* Products Interested */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Products Interested In <span className="text-red-500">*</span>
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {productOptions.map((product) => (
                              <label key={product} className="flex items-center space-x-3 bg-gray-800/30 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={data.productsInterested.includes(product)}
                                  onChange={() => handleCheckboxChange(product)}
                                  className="w-4 h-4 text-[#4A651F] focus:ring-[#4A651F] border-gray-600 rounded bg-gray-700"
                                />
                                <span className="text-white">{product}</span>
                              </label>
                            ))}
                          </div>
                          {errors.productsInterested && <p className="text-red-500 text-sm mt-1">{errors.productsInterested}</p>}
                        </div>

                        {/* Order Quantity */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Estimated Order Quantity
                          </label>
                          <input
                            type="text"
                            value={data.orderQuantity}
                            onChange={(e) => setData('orderQuantity', e.target.value)}
                            placeholder="e.g., 1000 units per month"
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                          />
                        </div>

                        {/* Additional Information */}
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Additional Information
                          </label>
                          <textarea
                            value={data.additionalInfo}
                            onChange={(e) => setData('additionalInfo', e.target.value)}
                            rows={4}
                            placeholder="Tell us more about your requirements, target markets, or any specific questions..."
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-500"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                          <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#4A651F] text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-800 transition-colors duration-300 text-lg min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                          >
                            {processing ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              'Submit Export Inquiry'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
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

