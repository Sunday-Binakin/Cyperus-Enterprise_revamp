import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useProductSearch } from '@/hooks/use-product-search';
import SearchResults from './search-results';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
  } = useProductSearch();

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Could redirect to a search results page if needed
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full -mt-8 gap-2" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search For Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-[90%] pl-4 pr-20 p-3 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#EFE554] transition-all duration-300"
        />
        
        {/* Clear button */}
        {searchQuery && (
          <button 
            type="button" 
            onClick={handleClearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="text-gray-400 w-4 h-4" />
          </button>
        )}
        
        {/* Search button */}
        <button 
          type="button" 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <Search className="text-[#4A651F] w-5 h-5" />
        </button>
      </div>

      {/* Search Results */}
      <SearchResults
        results={searchResults.slice(0, 8)} // Limit to 8 results
        isVisible={isFocused && searchQuery.trim().length > 0}
        onClose={() => setIsFocused(false)}
      />
    </div>
  );
}

