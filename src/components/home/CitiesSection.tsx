import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { cities } from '../../data/mockData';

const CitiesSection: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Популярные города</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Откройте для себя красоту и богатую историю городов Узбекистана, 
            каждый из которых хранит уникальные сокровища и традиции
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {cities.map((city) => (
            <Link 
              key={city.id} 
              to={`/cities/${city.id}`}
              className="card group overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative pt-[60%] overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center text-white/80 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{city.region}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{city.name}</h3>
                  <p className="text-white/80 text-sm">{city.shortDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;