import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // This will eventually link to our real login page
  const handleLogin = () => {
    console.log("Login button clicked");
    // We will navigate to the login page here later
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-16 w-auto"
                src="/saarthi-logo.png"
                alt="Saarthi Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-indigo-600 font-medium">Features</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About Us</Link>
            {/* Link to the existing Government Dashboard */}
            <Link to="/gov-dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Govt. Dashboard</Link>
          </div>

          {/* Login/Register Buttons & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
               {/* This will link to your existing DoctorLogin page */}
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                Doctor Login
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <Link to="/" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Home</Link>
            <Link to="/features" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Features</Link>
            <Link to="/about" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">About Us</Link>
            <Link to="/gov-dashboard" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">Govt. Dashboard</Link>
            <div className="mt-4 px-4">
              <Link to="/login" className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                Doctor Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
