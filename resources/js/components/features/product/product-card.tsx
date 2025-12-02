import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';
import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '@/store/cartHooks';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  categoryPath?: string;
}

export default function ProductCard({ product, categoryPath = 'bitter-kola' }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const formattedPrice = `GH₵${Number(product.price).toFixed(2)}`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    setIsAdding(true);
    
    try {
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inventory: product.stock
      });
      
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        style: {
          background: '#4A651F',
          color: 'white',
          border: '1px solid #EFE554',
        },
      });
    } catch {
      toast.error('Failed to add item to cart');
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 hover:border-[#EFE554] transition-colors duration-300 transform hover:scale-105 group relative overflow-hidden">
      <Link href={`/${categoryPath}/${product.id}`}>
        <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 p-2"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3 flex flex-col items-center">
        <h3 className="text-white text-lg font-semibold text-center h-[60px] m-2 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-400 text-sm text-center line-clamp-2 px-2 min-h-[40px]">
            {product.description}
          </p>
        )}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#EFE554] text-xl font-bold text-center">
            {formattedPrice}
          </p>
          {product.netWeight && (
            <p className="text-gray-400 text-sm">
              {product.netWeight}
            </p>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full flex flex-row justify-center relative py-3 rounded font-semibold overflow-hidden group border transition-all duration-300 ${
            product.stock > 0 
              ? 'border-[#EFE554] text-white hover:bg-[#EFE554] hover:text-black active:scale-95' 
              : 'border-gray-600 text-gray-500 cursor-not-allowed'
          } ${isAdding ? 'scale-95 bg-[#4A651F] text-white' : ''}`}
        >
          <span className="flex items-center justify-center gap-2">
            <TiShoppingCart className={`text-xl transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`} />
            {isAdding ? 'ADDING...' : product.stock > 0 ? 'ADD TO BASKET' : 'OUT OF STOCK'}
          </span>
        </button>
      </div>
    </div>
  );
}

