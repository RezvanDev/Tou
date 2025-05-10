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
      <div className="relative pt-[70%] overflow-hidden rounded-t-lg">
        <img 
          src={guide.avatar} 
          alt={guide.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center text-xs text-gray-500 mb-1.5">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{guide.city}</span>
          <div className="flex items-center ml-2 text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-0.5">{guide.rating}</span>
            <span className="ml-0.5 text-gray-500">({guide.reviewCount})</span>
          </div>
        </div>
        <h3 className="text-base font-semibold mb-1.5">{guide.name}</h3>
        <div className="flex flex-wrap items-center text-xs text-gray-600 mb-1.5">
          <Languages className="w-3.5 h-3.5 mr-1" />
          <span>{guide.languages.slice(0, 2).join(', ')}</span>
          {guide.languages.length > 2 && (
            <span className="ml-0.5">+{guide.languages.length - 2}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{guide.shortDescription}</p>
        <div className="flex items-center justify-between">
          <Link 
            to={`/guides/${guide.id}`}
            className="btn btn-outline text-xs py-1 px-3"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;