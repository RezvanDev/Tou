import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Languages } from 'lucide-react';
import { Guide } from '../../data/mockData';

interface GuideCardProps {
  guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="card group transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative pt-[100%] overflow-hidden rounded-t-lg">
        <img 
          src={guide.avatar} 
          alt={guide.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{guide.city}</span>
          <div className="flex items-center ml-4 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1">{guide.rating}</span>
            <span className="ml-1 text-gray-500">({guide.reviewCount})</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{guide.name}</h3>
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
          <Languages className="w-4 h-4 mr-1" />
          <span>{guide.languages.slice(0, 2).join(', ')}</span>
          {guide.languages.length > 2 && (
            <span className="ml-1">+{guide.languages.length - 2}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-4">{guide.shortDescription}</p>
        <div className="flex items-center justify-between mt-4">
          <Link 
            to={`/guides/${guide.id}`}
            className="btn btn-outline text-sm py-2"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;