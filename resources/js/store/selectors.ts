import { RootState } from './index';

// Cart selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectIsCartEmpty = (state: RootState) => state.cart.items.length === 0;

// Auth selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthIsInitialized = (state: RootState) => state.auth.isInitialized;

// Products selectors
export const selectAllProducts = (state: RootState) => state.products.list;

