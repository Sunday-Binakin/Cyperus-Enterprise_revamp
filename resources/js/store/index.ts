import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (state: any) => {
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    // Ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(),
  } as any,
});

// Subscribe to store changes to save cart
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

