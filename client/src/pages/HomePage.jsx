import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import EmergencySection from '../components/EmergencySection';
import ImageSlider from '../components/ImageSlider';
import AppDownload from '../components/AppDownload';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <EmergencySection />
      <ImageSlider />
      <AppDownload />
      <CTASection />
    </div>
  );
};

export default HomePage;
