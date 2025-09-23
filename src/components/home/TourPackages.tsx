import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tourPackages } from '../../data/packages';

const TourPackages: React.FC = () => {
  const featured = tourPackages.slice(0, 1);

  return (
    <section id="tour-packages-section" className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Тур пакеты</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Готовые маршруты с насыщенной программой</p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-12">
          {featured.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl font-bold mb-1">{pkg.title}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="space-y-8">
                  {pkg.itinerary.map((d, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">{d.day}</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {d.items.map((i, iIdx) => (
                          <li key={iIdx}>{i}</li>
                        ))}
                      </ul>
                      {d.sights && (
                        <div className="mt-3">
                          <div className="text-gray-800 font-semibold mb-1">{d.sightsTitle}</div>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {d.sights.map((s, sIdx) => (
                              <li key={sIdx}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {d.itemsAfter && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
                          {d.itemsAfter.map((i, aIdx) => (
                            <li key={aIdx}>{i}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <Link to={`/packages/${pkg.id}`} className="btn btn-primary">Подробнее</Link>
                    <div className="ml-3 text-sm text-gray-500">{pkg.duration} · Размещение и экскурсии включены</div>
                  </div>

                  {/* CTA block under package section */}
                  <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Заинтересовало?</h3>
                    <p className="text-gray-600 mb-4">Позвоните нам — быстро ответим на вопросы и подберем даты.</p>
                    <a href="tel:+998915340888" className="w-full inline-flex items-center justify-center btn btn-primary">Позвонить</a>
                    <div className="mt-3 text-xs text-gray-500">Работаем Пн–Пт 9:00–18:00, Сб 10:00–16:00</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;


