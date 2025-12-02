import { ChevronDown } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface DropdownItem {
  label: string;
  href?: string;
}

interface NavItemProps {
  label: string;
  dropdownItems?: DropdownItem[];
  href?: string;
}

export default function NavItem({ label, dropdownItems, href }: NavItemProps) {
  const { url } = usePage();
  const hasDropdown = dropdownItems && dropdownItems.length > 0;
  const isActive = href ? url === href : false;
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    if (hasDropdown) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasDropdown) {
      setIsHovered(false);
    }
  };

  const handleDropdownItemClick = () => {
    setIsHovered(false);
  };
  
  return (
    <li 
      className={`relative ${hasDropdown ? 'cursor-pointer' : ''} text-white ${isActive ? 'text-[#EFE554]' : 'hover:text-[#EFE554]'} transition-colors duration-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <Link href={href} className="flex items-center font-medium text-[11px] md:text-xs lg:text-sm xl:text-base px-0.5 md:px-0.5 lg:px-2">
          {label}
          {hasDropdown && <ChevronDown className="ml-0.5 md:ml-0.5 lg:ml-2" size={12} />}
        </Link>
      ) : (
        <span className="flex items-center font-medium text-[11px] md:text-xs lg:text-sm xl:text-base px-0.5 md:px-0.5 lg:px-2">
          {label}
          {hasDropdown && <ChevronDown className="ml-0.5 md:ml-0.5 lg:ml-2" size={12} />}
        </span>
      )}
      {hasDropdown && (
        <ul 
          className={`absolute left-0 top-full mt-1 w-[10rem] md:w-[11rem] lg:w-[15rem] bg-black border border-gray-700 rounded-md transition-all duration-200 shadow-lg z-[100] ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {dropdownItems?.map((item, index) => (
            <li key={index} className="hover:bg-gray-800">
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="block px-2 md:px-2 lg:px-4 py-1.5 md:py-1.5 text-[10px] md:text-xs lg:text-sm whitespace-nowrap text-white hover:text-[#EFE554] transition-colors"
                  onClick={handleDropdownItemClick}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="block px-2 md:px-2 lg:px-4 py-1.5 md:py-1.5 text-[10px] md:text-xs lg:text-sm whitespace-nowrap text-white">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

