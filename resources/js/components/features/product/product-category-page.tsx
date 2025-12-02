import { Link } from '@inertiajs/react';
import { Home, ChevronRight } from 'lucide-react';
import ProductGrid from './product-grid';
import { Product } from '@/types/product';

interface ProductCategoryPageProps {
  title: string;
  description?: string;
  products: Product[];
  categoryPath: string;
  heroImage?: string;
}

export default function ProductCategoryPage({
  title,
  description,
  products,
  categoryPath,
  heroImage = '/images/clients/hero/slider1.JPG'
}: ProductCategoryPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="container mx-auto px-4">
              {/* Page Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
              
              {/* Breadcrumb Navigation */}
              <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white">
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Link>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">{title}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our {title} Products</h2>
          <div className="w-24 h-1 bg-[#EFE554] mx-auto mb-4"></div>
          {description && (
            <p className="text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        <ProductGrid products={products} categoryPath={categoryPath} />
      </div>
    </div>
  );
}

