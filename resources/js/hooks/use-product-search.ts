import { useState, useEffect, useMemo } from 'react';

// TODO: Replace with actual product data from Laravel backend
// For now, these will be empty arrays until products are loaded

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  netWeight?: string;
}

// Category path mapping for navigation
const CATEGORY_PATH_MAP: Record<string, string> = {
  'Original': 'category/original',
  'Choconut': 'category/choconut',
  'Bitter Kola': 'category/bitter-kola',
  'Ginger': 'category/ginger',
  'Lemon Grass': 'category/lemon-grass',
  'Citrus Limon & Clove': 'category/citrus-limon-clove',
};

export function useProductSearch(allProducts: Product[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.netWeight && product.netWeight.toLowerCase().includes(query))
    );
  }, [searchQuery, allProducts]);

  // Set searching state when there's a query
  useEffect(() => {
    setIsSearching(searchQuery.trim().length > 0);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults: searchResults.length > 0,
    getCategoryPath: (category: string) => CATEGORY_PATH_MAP[category] || 'products',
  };
}

