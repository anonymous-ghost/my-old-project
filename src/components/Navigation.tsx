import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/hooks/useSessions';
import { useFavorites } from '@/hooks/useFilms';

export function Navigation() {
  const location = useLocation();
  const { favoriteIds } = useFavorites();
  const { cartIds } = useCart();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-neutral-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`nav-link inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/') ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/sessions"
              className={`nav-link inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/sessions') ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sessions
            </Link>
            <Link
              to="/favorites"
              className={`nav-link inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/favorites') ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Favorites {favoriteIds.length > 0 && <span className="ml-1">({favoriteIds.length})</span>}
            </Link>
            <Link
              to="/admin"
              className={`nav-link inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/admin') ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Admin Panel
            </Link>

          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className={`nav-link inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/search') ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              🔍 Search
            </Link>
            <Link
              to="/cart"
              className={`cart-button inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/cart') ? 'text-white' : 'text-neutral-400 hover:text-white'
              } ${cartIds.length > 0 ? 'active' : ''}`}
            >
              🛒 Cart {cartIds.length > 0 && <span className="ml-1">({cartIds.length})</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
