import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            Your Health, <span className="text-indigo-600">Simplified</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Comprehensive digital healthcare for migrant workers in Kerala. Access your records, find doctors, and monitor your health—all in one secure platform.
          </p>
          <div className="mt-10 flex justify-center items-center gap-4 flex-col sm:flex-row">
            <Link
              to="/register" // This will eventually go to a worker registration page
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Play className="mr-2 h-5 w-5 text-indigo-600" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
