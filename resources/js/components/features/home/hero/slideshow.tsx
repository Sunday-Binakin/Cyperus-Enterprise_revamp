import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDES } from './constants';

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[calc(100vh-60px)] overflow-hidden mt-[80px]">
      {/* Slides */}
      <div 
        className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative"
          >
            {/* Background Image with Enhanced Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Enhanced gradient overlay - darker at bottom for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-start justify-center text-white px-4 md:px-16 lg:px-24 pt-8 md:pt-20">
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-2 md:mb-4 tracking-tight drop-shadow-lg">{slide.title}</h1>
              <h2 className="text-3xl sm:text-4xl md:text-7xl mb-6 md:mb-12 font-light drop-shadow-lg">{slide.subtitle}</h2>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link 
                  href={slide.primaryButton.link}
                  className="bg-[#4A651F] text-white px-6 py-3 md:px-8 md:py-4 rounded hover:bg-[#55006F]/90 transition-colors text-base md:text-lg font-semibold tracking-wide shadow-lg text-center"
                >
                  {slide.primaryButton.text}
                </Link>
                <Link 
                  href={slide.secondaryButton.link}
                  className="bg-white text-[#55006F] px-6 py-3 md:px-8 md:py-4 rounded hover:bg-gray-100 transition-colors text-base md:text-lg font-semibold tracking-wide shadow-lg text-center"
                >
                  {slide.secondaryButton.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-2 md:p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-7 md:h-7" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-2 md:p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-7 md:h-7" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors shadow-sm ${
              currentSlide === index ? 'bg-white' : 'bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

