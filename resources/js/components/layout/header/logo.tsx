import React from 'react';
import { Link } from '@inertiajs/react';

const Logo: React.FC = () => (
  <div className="font-bold text-2xl">
    <Link href="/">
      <img
        src="/images/clients/logo.png"
        alt="Cyperus Logo"
        className="w-[100px] h-auto sm:w-[120px] md:w-[80px] lg:w-[120px] transition-all duration-300"
      />
    </Link>
  </div>
);

export default Logo;

