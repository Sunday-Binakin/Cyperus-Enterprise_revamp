import { useState, useEffect } from 'react';

type QuantitySelectorProps = {
  initialQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

export function QuantitySelector({ 
  initialQuantity = 1, 
  maxQuantity = 999,
  onQuantityChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(maxQuantity, quantity + 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-white mb-1">Quantity</h3>
      <div className="flex items-center border border-gray-600 rounded-md overflow-hidden h-10">
        <button 
          className="w-10 h-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition-colors text-xl font-light"
          aria-label="Decrease quantity"
          onClick={handleDecrease}
        >
          −
        </button>
        <div className="w-12 h-full flex items-center justify-center text-white bg-transparent border-x border-gray-600">
          <span className="font-medium">{quantity}</span>
        </div>
        <button 
          className="w-10 h-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition-colors text-xl font-light"
          aria-label="Increase quantity"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

