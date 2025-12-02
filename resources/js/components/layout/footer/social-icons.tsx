import React from 'react';
import { SOCIAL_ICONS } from './constants';

export default function SocialIcons() {
  return (
    <div className='flex flex-row gap-4 mt-4 text-white ml-4 sm:ml-6'>
      {SOCIAL_ICONS.map((Icon, idx) => (
        <span
          key={idx}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-300 transition-colors duration-300 cursor-pointer"
        >
          <Icon className="w-5 h-5 text-white hover:text-black transition-colors duration-300" />
        </span>
      ))}
    </div>
  );
}

