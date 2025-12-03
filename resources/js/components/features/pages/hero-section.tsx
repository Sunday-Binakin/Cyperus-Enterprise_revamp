import React, { ReactNode, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HeroSectionProps = {
  // Required props
  title: string;
  backgroundImage: string;
  
  // Optional props with defaults
  breadcrumbItems?: BreadcrumbItem[];
  subtitle?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
  contentPosition?: 'left' | 'center' | 'right';
  overlayOpacity?: number; // 0 to 100
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function HeroSection({
  title,
  backgroundImage,
  breadcrumbItems = [],
  subtitle,
  height = 'medium',
  contentPosition = 'left',
  overlayOpacity = 40,
  children,
  className = '',
  contentClassName = '',
  titleClassName = '',
  subtitleClassName = '',
}: HeroSectionProps) {
  // Height classes
  const heightClasses = {
    small: 'min-h-[50vh]',
    medium: 'min-h-[70vh]',
    large: 'min-h-[90vh]',
    full: 'min-h-screen',
  };

  // Content position classes
  const contentPositionClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current?.offsetHeight || 0;
        const translateY = scrollPosition * 0.5; // Adjust the 0.5 value to control the parallax speed
        
        if (scrollPosition <= heroHeight) {
          bgRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`relative ${heightClasses[height]} flex items-center overflow-hidden ${className}`}
    >
      {/* Background Image - Simplified without parallax */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${contentClassName}`}
        style={{
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className={`max-w-4xl mx-auto flex flex-col ${contentPositionClasses[contentPosition]}`}>
          {/* Title */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ${titleClassName}`}
          >
            {title}
          </h1>

          {/* Breadcrumb */}
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <nav className="mb-4 md:mb-6">
              <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-300">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
                    <li>
                      {item.href ? (
                        <Link 
                          href={item.href} 
                          className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white font-medium text-xs sm:text-sm">
                          {item.label}
                        </span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          )}
          
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-lg md:text-xl text-gray-200 mt-2 max-w-3xl ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
          
          {/* Custom children content */}
          {children}
        </div>
      </div>
    </div>
  );
}

