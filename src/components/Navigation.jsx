import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // TODO: Replace with actual auth state from Supabase/Context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/diagnosis', label: 'Get Started' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-blue-950/80 backdrop-blur-md z-50 border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="w-8 h-8 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              HairCare AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-emerald-400'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <button className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">
                    Profile
                  </button>
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-300 hover:text-red-400 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 font-medium transition-colors">
                    <LogIn size={18} />
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50">
                    <UserPlus size={18} />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900/90 backdrop-blur-md border-t border-emerald-900/30">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-emerald-900/50 text-emerald-400 font-medium'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors"
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-emerald-400 font-medium px-6 py-2.5 rounded-lg transition-all border border-emerald-700/30 hover:border-emerald-500/50">
                    <LogIn size={18} />
                    Login
                  </button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg">
                    <UserPlus size={18} />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;