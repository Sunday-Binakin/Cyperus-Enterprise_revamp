import { Product } from '@/types/product';
import { QuantitySelector } from './quantity-selector';
import { ProductDetails } from './product-details';
import { useCart } from '@/store/cartHooks';
import { useState } from 'react';
import { toast } from 'sonner';

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    
    setIsAdding(true);
    
    try {
      // Add the item to cart with specified quantity
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inventory: product.stock,
        quantity: quantity
      });
      
      toast.success(`${quantity} x ${product.name} added to cart!`, {
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
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-white">{product.name}</h1>
      
      <div className="mt-4 flex items-center gap-4">
        <p className="text-3xl tracking-tight text-white">
          GH₵{product.price.toFixed(2)}
        </p>
        {product.netWeight && (
          <span className="text-lg text-gray-400 border-l border-gray-600 pl-4">
            {product.netWeight}
          </span>
        )}
      </div>

      {product.description && (
        <div className="mt-6">
          <p className="text-base text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-gray-700 pt-6">
        <div className="flex items-center justify-between">
          <QuantitySelector 
            initialQuantity={quantity}
            onQuantityChange={handleQuantityChange}
            maxQuantity={product.stock}
          />
          
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">Total Price</p>
            <p className="text-xl font-bold text-[#EFE554]">GH₵{(product.price * quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`w-full flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              product.stock > 0 && !isAdding
                ? 'bg-[#EFE554] text-black hover:bg-[#d4ce4d] focus:ring-[#EFE554] active:scale-95'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            } ${isAdding ? 'scale-95 bg-[#4A651F] text-white' : ''}`}
          >
            <svg className={`w-5 h-5 mr-2 transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {isAdding ? 'Adding to Cart...' : product.stock > 0 ? `Add ${quantity} to Cart` : 'Out of Stock'}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="ml-1 text-sm text-gray-400">4.9 <span className="text-gray-500">(24 Reviews)</span></p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            In Stock: <span className="text-[#EFE554] font-medium">{product.stock} units</span>
          </p>
        </div>
      </div>

      <ProductDetails 
        category={product.category} 
        description={product.description} 
      />
    </div>
  );
}

