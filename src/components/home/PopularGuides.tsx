import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Languages } from 'lucide-react';
import { guides } from '../../data/mockData';

const PopularGuides: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Популярные гиды</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Наши лучшие гиды, которые получили высокие оценки туристов и обладают 
            глубокими знаниями о культуре, истории и традициях Узбекистана
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {guides.map((guide) => (
            <div 
              key={guide.id} 
              className="card group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative pt-[100%] overflow-hidden">
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
                <div className="flex justify-end mt-4">
                  <Link 
                    to={`/guides/${guide.id}`}
                    className="btn btn-outline text-sm py-2"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/guides" className="btn btn-primary">
            Смотреть всех гидов
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularGuides;