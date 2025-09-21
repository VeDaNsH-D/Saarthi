import React from 'react';
import { Users, Stethoscope, FileText, Ambulance } from 'lucide-react';

const healthMetrics = [
  { label: 'Active Users', value: '25,000+', Icon: Users },
  { label: 'Doctors Available', value: '500+', Icon: Stethoscope },
  { label: 'Records Managed', value: '100K+', Icon: FileText },
  { label: 'Emergency Responses', value: '1,200+', Icon: Ambulance }
];

const StatsSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {healthMetrics.map((metric) => (
            <div key={metric.label}>
              <metric.Icon className="w-10 h-10 mx-auto text-indigo-600" />
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-base leading-7 text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
