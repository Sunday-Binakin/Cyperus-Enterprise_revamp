import { useState } from 'react';
import type { CartItem } from '@/store/cartSlice';
import type { ShippingAddress } from '@/hooks/use-shipping-address';

interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  variant_info?: any;
}

interface CreateOrderData {
  session_id: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  total_amount: number;
  shipping_fee: number;
  tax_amount: number;
  payment_method: string;
  customer_email: string;
}

interface UseCheckoutOrderReturn {
  isCreatingOrder: boolean;
  orderError: string | null;
  createOrder: (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    email: string,
    total: number,
    shippingFee: number,
    tax: number
  ) => Promise<string>;
  clearOrderError: () => void;
}

export function useCheckoutOrder(): UseCheckoutOrderReturn {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const createOrder = async (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    email: string,
    total: number,
    shippingFee: number,
    tax: number
  ): Promise<string> => {
    setIsCreatingOrder(true);
    setOrderError(null);

    try {
      // TODO: Replace with actual API call using Inertia or axios
      const orderData: CreateOrderData = {
        session_id: crypto.randomUUID(),
        items: items.map((item): OrderItem => ({
          product_id: item.product_id,
          product_name: item.name,
          product_image: item.image,
          price: item.price,
          quantity: item.quantity || 1,
          variant_info: undefined
        })),
        shipping_address: shippingAddress,
        total_amount: total,
        shipping_fee: shippingFee,
        tax_amount: tax,
        payment_method: 'paystack',
        customer_email: email || ''
      };

      // Placeholder: This will be replaced with actual Laravel API endpoint
      console.log('Order data:', orderData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const orderId = crypto.randomUUID();
      
      return orderId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      setOrderError(errorMessage);
      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const clearOrderError = () => {
    setOrderError(null);
  };

  return {
    isCreatingOrder,
    orderError,
    createOrder,
    clearOrderError
  };
}

