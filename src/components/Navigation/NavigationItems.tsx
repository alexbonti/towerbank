import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

interface NavigationItemsProps {
  onItemClick: () => void;
}

export default function NavigationItems({ onItemClick }: NavigationItemsProps) {
  const { user } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onItemClick();
  };

  return (
    <nav className="space-y-1">
      <Link
        to="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onItemClick}
      >
        <UserCircle className="mr-3 h-5 w-5" />
        Profile
      </Link>
      
      <button
        onClick={handleSignOut}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Sign Out
      </button>
    </nav>
  );
}