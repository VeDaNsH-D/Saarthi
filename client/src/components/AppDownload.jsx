import React from 'react';
import { Smartphone, Lock, Bell } from 'lucide-react';

const AppDownload = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Get the <span className="text-indigo-600">Saarthi</span> Mobile App
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Access your health records on the go. Available for iOS and Android with offline sync capabilities for ultimate convenience.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-2">
                  <Smartphone className="h-6 w-6 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Works Offline</h3>
                  <p className="text-gray-600">No internet required for basic record access after initial sync.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-2">
                  <Lock className="h-6 w-6 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Biometric Security</h3>
                  <p className="text-gray-600">Secure your data with Face ID or Fingerprint authentication.</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <a href="#" className="flex items-center gap-3 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105">
                <div className="text-3xl"></div>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105">
                <img src="/google-play-icon.svg" alt="Google Play" className="w-8 h-8" />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative w-80 h-[34rem] bg-gray-900 rounded-[3rem] border-[10px] border-gray-800 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex flex-col justify-center items-center text-white p-4">
                <img src="/saarthi-logo.png" alt="Saarthi Logo" className="w-32 h-auto -mt-8" />
                <h3 className="mt-4 text-2xl font-bold">Saarthi</h3>
                <p className="text-sm opacity-80">Your Health Companion</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppDownload;
