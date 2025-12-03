import ProductCard from './product-card';

interface Product {
  id: number;
  name: string;
  slug?: string;
  price: number;
  comparePrice?: number;
  image?: string;
  category?: string;
  inStock?: boolean;
  weight?: string;
}

interface FeaturedProductsProps {
  products?: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Only use real products from backend - no fallback constants
  const displayProducts = products || [];

  // Don't render anything if no products are available from the database
  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-[#EFE554] text-lg font-medium mb-4">Our Signature Tigernut Products</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold">
            Tigernut Goodness, The Cyperus Way
            </h2>
        </div>

        {/* Mobile View - All products */}
        <div className="md:hidden space-y-4">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image || ''}
            />
          ))}
        </div>

        {/* Desktop View - All products in grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

