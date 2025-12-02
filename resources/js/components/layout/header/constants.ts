export interface NavItemBase {
  label: string;
  href?: string;
}

export interface NavItemWithDropdown extends Omit<NavItemBase, 'href'> {
  dropdownItems: NavItemBase[];
}

export type NavItem = NavItemBase | NavItemWithDropdown;

export function isNavItemWithDropdown(item: NavItem): item is NavItemWithDropdown {
  return 'dropdownItems' in item;
}

export const SHOP_ITEMS: NavItemBase[] = [
  { label: 'Bitter Kola', href: '/category/bitter-kola' },
  { label: 'Choconut', href: '/category/choconut' },
  { label: 'All Products', href: '/products' },
];

export const RESOURCE_ITEMS: NavItemBase[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Recipes', href: '/recipes' },
];

export const NAV_ITEMS = [
  {
    label: 'SHOP',
    dropdownItems: [
      { label: 'Original', href: '/category/original' },
      { label: 'Choconut', href: '/category/choconut' },
      { label: 'Bitter Kola', href: '/category/bitter-kola' },
      { label: 'Ginger', href: '/category/ginger' },
      { label: 'Lemon Grass', href: '/category/lemon-grass' },
      { label: 'Citrus Limon & Clove', href: '/category/citrus-limon-clove' },
      { label: 'All Products', href: '/products' }
    ]
  },
  {
    label: 'DISTRIBUTORS',
    dropdownItems: [
      { label: 'Local Distributors', href: '/local-distributors' },
      { label: 'International Distributors', href: '/international-distributors' }
    ]
  },
  { label: 'EXPORT DEPARTMENT', href: '/export-department' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'RESOURCE', dropdownItems: RESOURCE_ITEMS },
  { label: 'CONTACT US', href: '/contact-us' },
];

export const THEME = {
  colors: {
    primary: '#55006F',
    accent: '#EFE554',
    green: '#4A651F',
  }
};

