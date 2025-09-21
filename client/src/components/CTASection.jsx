import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-indigo-700 rounded-2xl shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
              Join thousands of migrant workers in Kerala who trust Saarthi for their healthcare needs. Registration is free and takes just a few minutes.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-transform transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
