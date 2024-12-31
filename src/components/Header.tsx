import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import BurgerMenu from './Navigation/BurgerMenu';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Tower Bank</h1>
        </Link>
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;