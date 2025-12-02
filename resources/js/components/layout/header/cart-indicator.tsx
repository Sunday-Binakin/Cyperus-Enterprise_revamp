import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CartIndicatorProps {
  itemCount: number;
}

export default function CartIndicator({ itemCount }: CartIndicatorProps) {
  const [animateCounter, setAnimateCounter] = useState(false);
  const [prevCount, setPrevCount] = useState(itemCount);

  useEffect(() => {
    if (itemCount !== prevCount && itemCount > 0) {
      setAnimateCounter(true);
      const timer = setTimeout(() => setAnimateCounter(false), 300);
      setPrevCount(itemCount);
      return () => clearTimeout(timer);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  return (
    <div className='relative cursor-pointer'>
      <ShoppingCart className='w-6 h-6 text-white hover:text-[#EFE554] transition-colors duration-200' />
      {itemCount > 0 && (
        <span 
          className={`absolute -top-2 -right-2 bg-[#EFE554] text-black text-xs rounded-full px-2 py-0.5 font-bold min-w-[20px] h-[20px] flex items-center justify-center transition-all duration-300 ${
            animateCounter ? 'scale-125 bg-[#4A651F] text-white' : 'scale-100'
          }`}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
}

