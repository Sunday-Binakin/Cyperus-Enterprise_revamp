import { Provider } from 'react-redux';
import { store } from '@/store';
import { CartInitializer } from './cart-initializer';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartInitializer>
        {children}
      </CartInitializer>
    </Provider>
  );
}

