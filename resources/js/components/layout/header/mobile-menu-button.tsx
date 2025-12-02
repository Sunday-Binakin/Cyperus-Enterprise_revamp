import React from 'react';

interface MobileMenuButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick, isOpen = false }) => (
  <button
    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#EFE554] relative w-8 h-8"
    aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
    onClick={onClick}
    type="button"
  >
    {/* Animated hamburger icon */}
    <span 
      className={`block absolute w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'
      }`}
    />
    <span 
      className={`block absolute w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    />
    <span 
      className={`block absolute w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'
      }`}
    />
  </button>
);

export default MobileMenuButton;

