import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag } from 'lucide-react';
import { tours } from '../../data/mockData';

const PopularTours: React.FC = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Популярные маршруты</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Самые популярные экскурсии и маршруты, которые помогут вам открыть для себя
            многогранную культуру и историю Узбекистана
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {tours.map((tour) => (
            <div 
              key={tour.id} 
              className="card group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-60 overflow-hidden rounded-t-lg">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{tour.city}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{tour.description}</p>
                
                <Link 
                  to={`/guides?city=${tour.city}&category=${tour.category}`}
                  className="btn btn-outline text-sm mt-2 w-full"
                >
                  Найти гида
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTours;