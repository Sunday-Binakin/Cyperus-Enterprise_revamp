import React from 'react';
import { INSTAGRAM_IMAGES } from './constants';

interface InstagramImageProps {
  src: string;
  alt: string;
}

function InstagramImage({ src, alt }: InstagramImageProps) {
  return (
    <div className="aspect-square w-full h-full">
      <img
        src={src}
        alt={alt}
        className="transition-transform duration-300 ease-out-in hover:scale-110 cursor-pointer w-full h-full object-cover border border-white/20"
      />
    </div>
  );
}

export default function InstagramFeed() {
  return (
    <div className="w-full md:w-[100%]">
      {/* Desktop title */}
      <p className='hidden md:block font-semibold text-white text-xl sm:text-2xl mt-4 mb-4'>Follow Us On Instagram</p>
      
      {/* Mobile optimized full-width grid */}
      <div className="w-full px-0 md:hidden">
        {/* Mobile title with padding */}
        <p className='font-semibold text-white text-xl sm:text-2xl mt-4 mb-4 px-4'>Follow Us On Instagram</p>
        <div className="grid grid-cols-3 gap-px w-full">
          {INSTAGRAM_IMAGES.map((src, idx) => (
            <InstagramImage key={idx} src={src} alt={`Instagram post ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Desktop layout (unchanged) */}
      <div className="hidden md:flex flex-col mt-4">
        <div className="flex flex-row gap-2 sm:gap-x-0.5 sm:-gap-y-8">
          {INSTAGRAM_IMAGES.slice(0, 3).map((src, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <img
                src={src}
                alt="Instagram"
                className="transition-transform duration-300 ease-out-in hover:scale-110 cursor-pointer w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 sm:gap-x-0.5 sm:-gap-y-4 mt-1">
          {INSTAGRAM_IMAGES.slice(3, 6).map((src, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <img
                src={src}
                alt="Instagram"
                className="transition-transform duration-300 ease-out-in hover:scale-110 cursor-pointer w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

