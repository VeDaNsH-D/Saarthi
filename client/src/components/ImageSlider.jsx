import React from 'react';

// This data should correspond to images you place in your `client/public` folder.
const images = [
  { src: '/worker1.png', alt: 'Construction worker giving thumbs up' },
  { src: '/worker2.png', alt: 'Smiling construction worker' },
  { src: '/worker3.png', alt: 'Professional construction worker' },
  { src: '/worker4.png', alt: 'Construction worker at building site' },
];

const ImageSlider = () => {
  // We double the images to create a seamless infinite loop effect
  const doubledImages = [...images, ...images];

  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Trusted by Workers Across Kerala
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Real stories and faces from the communities we serve.
        </p>
      </div>
      <div className="mt-12 w-full overflow-hidden relative">
        <div className="flex animate-slide">
          {doubledImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-64 sm:w-80 mx-4">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50"></div>
      </div>
    </div>
  );
};

export default ImageSlider;
