import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../data/mockData';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-start">
        <img 
          src={review.userAvatar} 
          alt={review.userName} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4 flex-grow">
          <div className="flex justify-between">
            <h4 className="font-medium">{review.userName}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <div className="flex text-yellow-500 my-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;