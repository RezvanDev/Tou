import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { toursByCountry, Tour } from '../data/mockData';
import TourModal from '../components/common/TourModal';

const ToursPage: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const countryNames = {
    uzbekistan: 'Узбекистан',
    turkmenistan: 'Туркменистан',
    kazakhstan: 'Казахстан',
    kyrgyzstan: 'Кыргызстан', 
    tajikistan: 'Таджикистан'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Havas - Туры по ${countryNames[country as keyof typeof countryNames] || 'Центральной Азии'}`;
  }, [country]);

  const handleTourClick = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  // Если страна не указана, показываем все туры
  const countryTours = country && toursByCountry[country as keyof typeof toursByCountry] 
    ? toursByCountry[country as keyof typeof toursByCountry]
    : Object.values(toursByCountry).flat();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Туры по {country ? countryNames[country as keyof typeof countryNames] : 'Центральной Азии'}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Откройте для себя удивительные уголки {country ? countryNames[country as keyof typeof countryNames] : 'Центральной Азии'} с нашими профессиональными турами
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countryTours.map((tour) => (
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
                      <span>{tour.category ? tour.category.charAt(0).toUpperCase() + tour.category.slice(1) : 'Тур'}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">{tour.description}</p>
                  
                
                  
                  <button 
                    onClick={() => handleTourClick(tour)}
                    className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Подробно
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Не нашли подходящий тур?
              </h3>
              <p className="text-gray-600 mb-6">
                Свяжитесь с нами, и мы создадим индивидуальный маршрут специально для вас
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+998975465955"
                  className="btn btn-primary"
                >
                  +998 (91) 534-08-88
                </a>
                <a 
                  href="/contacts"
                  className="btn btn-outline"
                >
                  Связаться с нами
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Modal */}
      <TourModal 
        tour={selectedTour} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default ToursPage;
