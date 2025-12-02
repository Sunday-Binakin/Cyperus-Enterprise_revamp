import React, { useState, useEffect, useRef } from "react";
import NavItem from "./nav-item";
import SearchBar from "./search-bar";
import CartIndicator from "./cart-indicator";
import CartPopover from "./cart-popover";
import { NAV_ITEMS, isNavItemWithDropdown } from "./constants";
import Logo from "./logo";
import MobileMenuButton from "./mobile-menu-button";
import { useCart } from "@/store/cartHooks";
import { Link } from "@inertiajs/react";

export default function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAnyDropdownHovered, setIsAnyDropdownHovered] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const controlSearchBar = React.useCallback(() => {
    const currentScrollY = window.scrollY;

    // Hide search bar when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlSearchBar);
    return () => window.removeEventListener("scroll", controlSearchBar);
  }, [controlSearchBar]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex flex-col bg-[#4A651F]">
        <div className="flex flex-row justify-between items-center p-2 lg:p-3 w-full px-4 lg:px-8 min-h-[60px]">
          {/* Logo */}
          <div className="flex-shrink-0 w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-40">
            <Logo />
          </div>

          {/* Nav links - hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center px-1 md:px-1">
            <ul className="flex flex-row gap-0.5 md:gap-0.5 lg:gap-2 xl:gap-4 font-medium whitespace-nowrap text-[11px] md:text-xs lg:text-sm xl:text-base items-center">
              {/* Standard nav items */}
              {NAV_ITEMS.filter(item => item.label !== 'MY ACCOUNT').map((item, index: number) =>
                isNavItemWithDropdown(item) ? (
                  <div
                    key={index}
                    onMouseEnter={() => setIsAnyDropdownHovered(true)}
                    onMouseLeave={() => setIsAnyDropdownHovered(false)}
                  >
                    <NavItem
                      label={item.label}
                      dropdownItems={item.dropdownItems}
                    />
                  </div>
                ) : (
                  <NavItem key={index} label={item.label} href={item.href} />
                )
              )}
            </ul>
          </div>

          {/* Cart, Subscribe, and Menu */}
          <div className="flex flex-row gap-1 md:gap-1 lg:gap-3 xl:gap-4 items-center flex-shrink-0">
            <div
              className="hidden md:block relative"
              ref={cartRef}
              onMouseEnter={() => getTotalItems() > 0 && setShowCartPopover(true)}
              onMouseLeave={() => setShowCartPopover(false)}
            >
              <CartIndicator itemCount={getTotalItems()} />
              {showCartPopover && getTotalItems() > 0 && <CartPopover />}
            </div>

            {/* Subscribe button - hidden on mobile and small screens */}
            <Link 
              href="/subscribe-save"
              className="bg-[#C2A83E] text-white font-semibold border border-[#C2A83E] hover:bg-[#55006F] hover:text-white hover:border-[#55006F] transition-colors duration-300 ease-in-out transform hover:scale-105 py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-4 xl:px-6 rounded text-[10px] md:text-xs lg:text-sm hidden md:block whitespace-nowrap"
            >
              <span className="hidden xl:inline">SUBSCRIBE & SAVE</span>
              <span className="xl:hidden">SUBSCRIBE</span>
            </Link>

            {/* Menu icon - mobile and tablet */}
            <div className="md:hidden flex items-center gap-2">
              <div
                className="relative"
                onClick={() => getTotalItems() > 0 && setShowCartPopover(!showCartPopover)}
              >
                <CartIndicator itemCount={getTotalItems()} />
                {showCartPopover && getTotalItems() > 0 && (
                  <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowCartPopover(false)}>
                    <div className="absolute top-20 right-4 w-80" onClick={(e) => e.stopPropagation()}>
                      <CartPopover />
                    </div>
                  </div>
                )}
              </div>
              <MobileMenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
            </div>
          </div>
        </div>

        {/* Account and search - hidden on mobile */}
        <div className="hidden lg:flex flex-col items-center bg-[#4A651F] py-2 relative z-10 w-full">
          <div className="w-[90%] max-w-[1400px] mx-auto">
            <div
              className={`transition-all duration-300 transform ${
                showSearch && !isAnyDropdownHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 pointer-events-none -translate-y-2"
              }`}
            >
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="lg:hidden w-full px-4 pb-2">
          <div
            className={`transition-all duration-300 transform ${
              showSearch
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="max-w-full mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-4/5 bg-[#4A651F] text-white transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-2xl p-2 focus:outline-none"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <ul className="space-y-6">
              {/* Standard nav items */}
              {NAV_ITEMS.filter(item => item.label !== 'MY ACCOUNT').map((item, index: number) => (
                <li key={index} className="border-b border-white/20 pb-2">
                  {!isNavItemWithDropdown(item) && item.href ? (
                    <Link
                      href={item.href}
                      className="block py-2 text-lg font-semibold hover:text-[#EFE554] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <span className="block py-2 text-lg font-semibold">
                        {item.label}
                      </span>
                      {isNavItemWithDropdown(item) && (
                        <ul className="mt-2 pl-4 space-y-2">
                          {item.dropdownItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href || "#"}
                                className="block py-1 text-gray-200 hover:text-[#EFE554] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
              
              <li className="pt-4">
                <Link
                  href="/subscribe-save"
                  className="block w-full bg-[#C2A83E] text-white text-center font-semibold py-3 px-4 rounded hover:bg-[#55006F] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SUBSCRIBE & SAVE
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-[60px] md:h-[80px]"></div>
    </>
  );
}

