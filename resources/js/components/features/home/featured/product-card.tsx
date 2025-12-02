import { router } from '@inertiajs/react';
import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '@/store/cartHooks';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { items, addItem } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    if (id && items) {
      setIsInCart(items.some(item => item.product_id === id.toString()));
    }
  }, [items, id]);
  
  if (!id || !name || !price || !image) {
    console.error('ProductCard: Missing required props', { id, name, price, image });
    return null;
  }
  
  const formattedPrice = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(price);

  const addToCart = async () => {
    setIsAdding(true);
    
    try {
      addItem({
        product_id: id.toString(),
        name,
        price,
        image,
        inventory: 999
      });
      
      toast.success(`${name} added to cart!`, {
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

  const handleClick = () => {
    if (isInCart) {
      router.visit('/cart');
    } else {
      addToCart();
    }
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden group border border-gray-700 p-3 hover:border-[#EFE554] transition-all duration-300">
      <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 p-2"
        />
      </div>
      <div className="p-4 space-y-3 flex flex-col items-center">
        <h3 className="text-white text-lg font-semibold text-center h-[60px] m-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-[#EFE554] text-xl font-bold text-center mt-4">
          {formattedPrice.replace('GHS', 'GH₵')}
        </p>
        <button 
          onClick={handleClick}
          disabled={isAdding}
          className={`w-full flex flex-row justify-center items-center relative py-3 rounded font-semibold transition-all duration-300 ${
            isInCart 
              ? 'bg-[#4A651F] text-white hover:bg-[#3a4f18]' 
              : 'bg-transparent text-white hover:bg-[#EFE554] hover:text-black border border-[#EFE554]'
          } ${isAdding ? 'scale-95 bg-[#4A651F] text-white' : ''} active:scale-95`}
        >
          <TiShoppingCart className={`text-xl mr-2 transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`} />
          <span>
            {isAdding ? 'ADDING...' : isInCart ? 'VIEW BASKET' : 'ADD TO BASKET'}
          </span>
        </button>
      </div>
    </div>
  );
}

