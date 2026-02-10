import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-blue-950/80 backdrop-blur-md z-50 border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              HairCare AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/')
                  ? 'text-white font-semibold border-b-2 border-emerald-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive('/about')
                  ? 'text-white font-semibold border-b-2 border-emerald-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`transition-colors ${
                  isActive('/dashboard')
                    ? 'text-white font-semibold border-b-2 border-emerald-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/diagnosis"
              className={`transition-colors ${
                isActive('/diagnosis')
                  ? 'text-white font-semibold border-b-2 border-emerald-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Get Started
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-emerald-700/30">
                  <User size={18} className="text-emerald-400" />
                  <span className="text-gray-300 text-sm">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg border border-red-700/30 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-lg transition-all"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-emerald-900/30">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-emerald-900/30 text-white font-semibold'
                  : 'text-gray-300 hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-emerald-900/30 text-white font-semibold'
                  : 'text-gray-300 hover:bg-slate-800/50'
              }`}
            >
              About
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-emerald-900/30 text-white font-semibold'
                    : 'text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/diagnosis"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/diagnosis')
                  ? 'bg-emerald-900/30 text-white font-semibold'
                  : 'text-gray-300 hover:bg-slate-800/50'
              }`}
            >
              Get Started
            </Link>

            <div className="pt-3 border-t border-emerald-900/30">
              {user ? (
                <>
                  <div className="px-4 py-2 text-gray-400 text-sm">
                    {user.user_metadata?.full_name || user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-slate-800/50 rounded-lg"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg mt-2"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;