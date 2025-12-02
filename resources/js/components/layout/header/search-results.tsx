import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';

interface SearchResultsProps {
  results: Product[];
  isVisible: boolean;
  onClose: () => void;
  getCategoryPath?: (category: string) => string;
}

// Category path mapping
const getCategoryPath = (category: string): string => {
  const pathMap: Record<string, string> = {
    'Original': 'original',
    'Choconut': 'choconut',
    'Bitter Kola': 'bitter-kola',
    'Ginger': 'ginger',
    'Lemon Grass': 'lemon-grass',
    'Citrus Limon & Clove': 'citrus-limon-clove',
  };
  return pathMap[category] || 'products';
};

export default function SearchResults({ results, isVisible, onClose }: SearchResultsProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No products found
        </div>
      ) : (
        <div className="py-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/${getCategoryPath(product.category)}/${product.id}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              onClick={onClose}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-300 truncate line-clamp-1">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-semibold text-[#EFE554]">
                    GH₵{product.price.toFixed(2)}
                  </span>
                  {product.netWeight && (
                    <span className="text-xs text-gray-400">
                      {product.netWeight}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">
                    {product.category}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Stock: {product.stock} units
                </div>
              </div>
              <div className="flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-[#EFE554] transition-colors" />
              </div>
            </Link>
          ))}
          {results.length > 5 && (
            <div className="p-3 text-center border-t border-gray-700">
              <Link
                href="/products"
                className="text-sm text-[#EFE554] hover:text-white font-medium transition-colors"
                onClick={onClose}
              >
                View all products →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

