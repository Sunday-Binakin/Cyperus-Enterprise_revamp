import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from './constants';
import CategoryCard from './category-card';

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3;

  const slideToIndex = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    if (currentIndex + itemsPerView < PRODUCT_CATEGORIES.length) {
      slideToIndex(currentIndex + 1);
    } else {
      slideToIndex(0);
    }
  }, [currentIndex, slideToIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      slideToIndex(currentIndex - 1);
    } else {
      const lastPossibleIndex = Math.max(0, PRODUCT_CATEGORIES.length - itemsPerView);
      slideToIndex(lastPossibleIndex);
    }
  }, [currentIndex, slideToIndex]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous category"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next category"
        >
          <ChevronRight size={24} />
        </button>

        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex items-center gap-8 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {PRODUCT_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                className={`flex-shrink-0 w-1/3 px-2 transition-transform duration-300 hover:scale-105 ${
                  index >= currentIndex * itemsPerView && index < (currentIndex + 1) * itemsPerView ? 'opacity-100' : 'opacity-0 absolute'
                }`}
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  link={category.link}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(1, Math.ceil(PRODUCT_CATEGORIES.length / itemsPerView)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => slideToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#EFE554] w-6' : 'bg-gray-600'
              }`}
              aria-label={`View categories ${index * itemsPerView + 1} to ${Math.min((index + 1) * itemsPerView, PRODUCT_CATEGORIES.length)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

