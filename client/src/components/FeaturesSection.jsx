import React from 'react';
import { ArrowRight, CheckCircle, Zap, Video, Bell, TrendingUp, AlertCircle, Shield, Activity } from 'lucide-react';

const features = [
  {
    emoji: '🏥',
    title: 'Digital Health Card',
    desc: 'QR code enabled health cards with instant access to your medical information.',
    badge: 'Instant verification',
    BadgeIcon: CheckCircle,
  },
  {
    emoji: '📋',
    title: 'Smart Medical Records',
    desc: 'AI-powered organization with automatic categorization and smart search.',
    badge: 'AI-powered insights',
    BadgeIcon: Zap,
  },
  {
    emoji: '💻',
    title: 'Telemedicine',
    desc: 'Video consultations with certified doctors, available 24/7 in multiple languages.',
    badge: 'HD video calls',
    BadgeIcon: Video,
  },
  {
    emoji: '💊',
    title: 'Medicine Tracker',
    desc: 'Smart reminders, drug interactions checker, and pharmacy locator with delivery.',
    badge: 'Smart reminders',
    BadgeIcon: Bell,
  },
  {
    emoji: '📊',
    title: 'Health Analytics',
    desc: 'Comprehensive health insights with predictive analytics and personalized recommendations.',
    badge: 'Predictive insights',
    BadgeIcon: TrendingUp,
  },
  {
    emoji: '🚨',
    title: 'Emergency Services',
    desc: 'One-tap emergency contacts, location sharing, and instant medical alert system.',
    badge: 'Instant response',
    BadgeIcon: AlertCircle,
    isEmergency: true,
  },
];

const FeatureCard = ({ feature }) => (
  <div className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
    <div className="text-4xl mb-4">{feature.emoji}</div>
    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
    <p className="mt-2 text-gray-600 flex-grow">{feature.desc}</p>
    <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full w-fit ${feature.isEmergency ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
      <feature.BadgeIcon className="h-4 w-4" />
      <span>{feature.badge}</span>
    </div>
    <button className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${feature.isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
      Learn More <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

const FeaturesSection = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Comprehensive Healthcare Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Everything you need for complete healthcare management in one platform.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
