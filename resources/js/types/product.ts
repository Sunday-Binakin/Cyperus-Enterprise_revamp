export interface Product {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  weight: string;
  stock?: number;
  netWeight?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

