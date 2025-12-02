import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product { 
  id: string; 
  name: string;
}

export interface ProductsState { 
  list: Product[];
}

const initialState: ProductsState = { 
  list: [] 
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) { 
      state.list = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

