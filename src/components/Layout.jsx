import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Main content with padding-top to prevent navbar overlap */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 bg-blue-950/50 backdrop-blur-sm py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">About HairCare AI</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered hair health diagnosis platform helping you discover the root cause of your hair problems through science-backed analysis.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/diagnosis" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: contact@haircareai.com</p>
                <p>Phone: +91 7006193940</p>
                <p>Location: Noida, India</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-emerald-900/30 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2026 <span className="font-semibold text-emerald-400">HairNet</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              This is an AI-powered analysis tool. For serious medical concerns, please consult a healthcare professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;