import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tourPackages } from '../data/packages';

const PackagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section">
        <div className="container-custom">
          <div className="section-title">
            <h2 className="mb-4">Тур пакеты</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Выберите пакет и смотрите подробную программу</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {tourPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-1">{pkg.title}</h3>
                    <div className="text-white/90 text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <Link to={`/packages/${pkg.id}`} className="btn btn-primary">Подробнее</Link>
                  <div className="ml-3 text-sm text-gray-500">{pkg.duration} · Размещение и экскурсии включены</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;


