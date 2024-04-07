import React from 'react';

const StarRating = ({ rating }) => {
  // Round the rating to the nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;

  // Create an array to represent the number of filled and empty stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      // Filled star
      stars.push(
        <svg class="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg class="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
