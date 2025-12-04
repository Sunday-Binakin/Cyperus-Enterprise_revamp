import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@inertiajs/react';

const DEFAULT_IMAGE = '/images/clients/hero/slider1.JPG';
const PARALLAX_RATIO = 0.5;
const TRANSITION_DURATION = '0.1s';

function useParallax() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { mounted, scrollY };
}

interface TigernutsCTAProps {
  backgroundImage?: string;
  className?: string;
}

export default function TigernutsCTA({
  backgroundImage = DEFAULT_IMAGE,
  className = ''
}: TigernutsCTAProps) {
  const { mounted, scrollY } = useParallax();
  const bgRef = useRef<HTMLDivElement>(null);

  if (!mounted) return null;

  const transformStyle = { transform: `translate3d(0, ${scrollY * PARALLAX_RATIO}px, 0)` };

  return (
    <section
      className={`relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Parallax Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          ...transformStyle,
          transition: `transform ${TRANSITION_DURATION} ease-out`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-yellow-400 text-2xl md:text-3xl font-bold drop-shadow-lg mb-2">
          YOU DON&apos;T HAVE TO WAIT ANY LONGER
        </h2>
        <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-6">
          Enjoy The Goodness Of Tigernuts Today
        </h3>
        <Link
          href="/contact-us"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Contact Us"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
}

