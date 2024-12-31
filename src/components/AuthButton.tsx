import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const AuthButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuth = () => {
    if (user) {
      supabase.auth.signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      {user ? 'Sign Out' : 'Sign In'}
    </button>
  );
};

export default AuthButton;