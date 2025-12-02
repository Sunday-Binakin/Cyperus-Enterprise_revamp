import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Cart Item Interface - matches Context API structure
 * Enhanced to store full product information for better UX
 */
export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  image: string;
  inventory: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart or increment quantity if already exists
     */
    addItem(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const existing = state.items.find(i => i.product_id === action.payload.product_id);
      
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
      }
    },

    /**
     * Update quantity of specific cart item
     * Removes item if quantity is 0 or less
     */
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.product_id !== productId);
      } else {
        const item = state.items.find(i => i.product_id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    /**
     * Remove specific item from cart
     */
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.product_id !== action.payload);
    },

    /**
     * Clear all items from cart
     */
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

