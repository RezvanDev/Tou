import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag, ChevronDown } from 'lucide-react';
import { tours } from '../../data/mockData';

const PopularTours: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedTours = showAll ? tours : tours.slice(0, 4);

  return (
    <section id="tours-section" className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Туры по Узбекистану</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Откройте для себя самые интересные уголки Узбекистана с нашими профессиональными турами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {displayedTours.map((tour) => (
            <div 
              key={tour.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ${tour.price}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-1">{tour.title}</h3>
                  <p className="text-white/90 text-sm">{tour.city}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                    <span>{tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">{tour.description}</p>
                
                <Link 
                  to={`/city/${tour.city.toLowerCase()}`}
                  className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Подробно
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Показать еще" */}
        {tours.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">
                {showAll ? 'Скрыть' : 'Показать еще'}
              </span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTours;