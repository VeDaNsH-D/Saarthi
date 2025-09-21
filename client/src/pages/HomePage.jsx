import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';

// We will add more sections here later
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      {/* <TestimonialsSection /> */}
      {/* <AppDownloadSection /> */}
    </div>
  );
};

export default HomePage;
