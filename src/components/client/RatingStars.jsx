import React from 'react';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;
    return (
      <div key={index} className="relative inline-block text-gray-300 text-lg">
        <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${fillPercentage}%` }}>
          <span className="text-yellow text-2xl">★</span>
        </div>
        <span className='text-2xl'>★</span>
      </div>
    );
  });

  return (
    <div className="flex items-center">
      {stars}
    </div>
  );
};

export default RatingStars;
