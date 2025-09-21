import React from 'react';
import { Phone, Shield, FireExtinguisher } from 'lucide-react'; // Assuming 'Fire' is not a standard icon, using a substitute

const emergencyServices = [
  { name: 'Ambulance', number: '108', color: 'bg-red-600', hoverColor: 'hover:bg-red-700' },
  { name: 'Police', number: '100', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
  { name: 'Fire', number: '101', color: 'bg-orange-600', hoverColor: 'hover:bg-orange-700' },
  { name: 'Women Helpline', number: '1091', color: 'bg-pink-600', hoverColor: 'hover:bg-pink-700' },
];

const EmergencySection = () => {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Emergency Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Quick access to emergency services. Tap to call instantly.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {emergencyServices.map((service) => (
            <a
              key={service.name}
              href={`tel:${service.number}`}
              className={`p-6 rounded-2xl text-white shadow-lg transition-transform transform hover:-translate-y-1 ${service.color} ${service.hoverColor}`}
            >
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <p className="font-semibold">{service.name}</p>
              <p className="text-2xl font-bold">{service.number}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;
