import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  email: string;
  firstName?: string;
}

export interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  if (typeof window === 'undefined') return null as AuthUser | null;
  const raw = localStorage.getItem('auth_user');
  return raw ? (JSON.parse(raw) as AuthUser) : null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload) localStorage.setItem('auth_user', JSON.stringify(action.payload));
        else localStorage.removeItem('auth_user');
      }
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') localStorage.removeItem('auth_user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

