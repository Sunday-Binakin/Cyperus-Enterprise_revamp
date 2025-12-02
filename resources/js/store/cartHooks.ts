/**
 * Custom Redux Cart Hooks
 * Provides the same interface as Context API for seamless migration
 */

import { useDispatch, useSelector } from 'react-redux';
import type { CartItem } from './cartSlice';
import { addItem, updateQuantity, removeItem, clearCart } from './cartSlice';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectIsCartEmpty
} from './selectors';

/**
 * Custom hook for cart operations
 * Matches the Context API interface for easy migration
 */
export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isEmpty = useSelector(selectIsCartEmpty);

  return {
    // State
    items,
    isEmpty,
    
    // Actions
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      dispatch(addItem(item));
    },
    
    updateQuantity: (productId: string, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
    },
    
    removeItem: (productId: string) => {
      dispatch(removeItem(productId));
    },
    
    clearCart: () => {
      dispatch(clearCart());
    },
    
    // Computed values (memoized via selectors)
    getTotalItems: () => totalItems,
    getTotalPrice: () => totalPrice,
  };
}

