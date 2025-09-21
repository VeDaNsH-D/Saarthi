import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Logo and Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img
                className="h-16 w-auto bg-white/10 p-2 rounded-md"
                src="/saarthi-logo.png"
                alt="Saarthi Logo"
              />
            </Link>
            <p className="mt-4 text-sm">
              Your Health Companion. Providing accessible and secure digital healthcare for migrant workers in Kerala.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/gov-dashboard" className="hover:text-white transition-colors">Govt. Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: For Users */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">For Users</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/login" className="hover:text-white transition-colors">Doctor Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register Worker</Link></li>
              <li><Link to="/download" className="hover:text-white transition-colors">Get the App</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Saarthi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
