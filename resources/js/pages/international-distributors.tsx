import { Head, Link, useForm } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { HeroSection } from '@/components/features/pages/hero-section';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function InternationalDistributors() {
  const { data, setData, post, processing, reset, errors } = useForm({
    fullName: '',
    companyName: '',
    countryCity: '',
    email: '',
    phone: '',
    businessType: '',
    businessYears: '',
    currentlyDistributing: '',
    currentBrands: '',
    interestedProducts: [] as string[],
    monthlyQuantity: '',
    packagingPreference: '',
    importExperience: '',
    shippingMethod: ''
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setData('interestedProducts', checked 
      ? [...data.interestedProducts, value]
      : data.interestedProducts.filter(item => item !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (data.interestedProducts.length === 0) {
      toast.error('Please select at least one product you are interested in.');
      return;
    }

    post('/contact', {
      onSuccess: () => {
        toast.success('Thank you for your inquiry! We will contact you soon.');
        reset();
      },
      onError: () => {
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <>
      <Head title="International Distributors - Cyperus Enterprise" />
      <Header />
      
      <HeroSection 
        title="International Distributors" 
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'International Distributors', href: '/international-distributors' }
        ]} 
        backgroundImage="/images/clients/products/footer/choconut.jpg" 
      />

      <div className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-black rounded-lg shadow-lg p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🌍 International Distributors
              </h1>
              <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-6">
                Help us take Ghana&apos;s finest tigernut products global.
                Bulk orders, export-ready packaging, and great margins await.
              </p>
              
              <div className="bg-[#4A651F] rounded-lg p-6 inline-block">
                <p className="text-white text-lg font-medium">
                  📧 Email us or fill our export form to partner with us
                </p>
                <a 
                  href="mailto:exports@cyperus.com" 
                  className="text-[#EFE554] hover:text-yellow-300 transition-colors underline"
                >
                  exports@cyperus.com
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => setData('fullName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={data.companyName}
                      onChange={(e) => setData('companyName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Country & City *
                    </label>
                    <input
                      type="text"
                      value={data.countryCity}
                      onChange={(e) => setData('countryCity', e.target.value)}
                      required
                      placeholder="e.g., Nigeria, Lagos"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number (with country code) *
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      required
                      placeholder="e.g., +234 123 456 7890"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Business Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Type of Business *
                    </label>
                    <select
                      value={data.businessType}
                      onChange={(e) => setData('businessType', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select business type</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="distributor">Distributor</option>
                      <option value="online-store">Online Store</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      How long have you been in business? *
                    </label>
                    <input
                      type="text"
                      value={data.businessYears}
                      onChange={(e) => setData('businessYears', e.target.value)}
                      required
                      placeholder="e.g., 5 years"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                    {errors.businessYears && <p className="text-red-500 text-sm mt-1">{errors.businessYears}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you currently distribute food or beverage products? *
                    </label>
                    <select
                      value={data.currentlyDistributing}
                      onChange={(e) => setData('currentlyDistributing', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.currentlyDistributing && <p className="text-red-500 text-sm mt-1">{errors.currentlyDistributing}</p>}
                  </div>
                  
                  {data.currentlyDistributing === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        If yes, which brands?
                      </label>
                      <textarea
                        value={data.currentBrands}
                        onChange={(e) => setData('currentBrands', e.target.value)}
                        rows={3}
                        placeholder="List the brands you currently distribute..."
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Interest in Cyperus Products */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Interest in Cyperus Products</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-4">
                      Which of our products are you interested in? (Check all that apply) *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Beverages', 'Snacks', 'Flour', 'Popsicles', 'Poultry Feed'].map((product) => (
                        <label key={product} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            value={product.toLowerCase()}
                            checked={data.interestedProducts.includes(product.toLowerCase())}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#4A651F] focus:ring-[#4A651F] border-gray-300 rounded"
                          />
                          <span className="text-white">{product}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interestedProducts && <p className="text-red-500 text-sm mt-1">{errors.interestedProducts}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Estimated monthly order quantity (if known)
                    </label>
                    <input
                      type="text"
                      value={data.monthlyQuantity}
                      onChange={(e) => setData('monthlyQuantity', e.target.value)}
                      placeholder="e.g., 1000 units"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Preferred packaging size *
                    </label>
                    <select
                      value={data.packagingPreference}
                      onChange={(e) => setData('packagingPreference', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select packaging preference</option>
                      <option value="retail-packs">Retail packs</option>
                      <option value="bulk">Bulk</option>
                      <option value="custom">Custom</option>
                    </select>
                    {errors.packagingPreference && <p className="text-red-500 text-sm mt-1">{errors.packagingPreference}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping & Logistics */}
              <div className="bg-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping & Logistics</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you have experience with importing goods? *
                    </label>
                    <select
                      value={data.importExperience}
                      onChange={(e) => setData('importExperience', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F]"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.importExperience && <p className="text-red-500 text-sm mt-1">{errors.importExperience}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Do you have a preferred shipping method or freight partner? (Optional)
                    </label>
                    <input
                      type="text"
                      value={data.shippingMethod}
                      onChange={(e) => setData('shippingMethod', e.target.value)}
                      placeholder="e.g., DHL, FedEx, or specific freight company"
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#4A651F] focus:border-[#4A651F] placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#4A651F] text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-800 transition-colors duration-300 text-lg w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit International Distributor Inquiry'
                  )}
                </button>
                <p className="text-gray-400 mt-4">
                  We&apos;ll review your application and get back to you within 48 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

