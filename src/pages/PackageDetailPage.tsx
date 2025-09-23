import React from 'react';
import { Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { tourPackages } from '../data/packages';

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const pkg = tourPackages.find((p) => p.id === packageId) ?? tourPackages[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Верхний баннер */}
      <section className="relative h-72">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-6">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{pkg.title}</h1>
            <div className="text-white/90 text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="space-y-8">
                {/* Итнернарий */}
                {pkg.itinerary.map((d, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{d.day}</h2>
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

                {/* Отели */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Размещение в отелях</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(pkg.hotels ?? []).map((h, hIdx) => (
                      <div key={hIdx} className="bg-gray-50 rounded-xl p-4">
                        <div className="font-semibold text-gray-800 mb-2">{h.city}</div>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {h.list.map((name, nIdx) => (
                            <li key={nIdx}>{name}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Включено/Не включено */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Цена включает</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {(pkg.includes ?? []).map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Цена не включает</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {(pkg.excludes ?? []).map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Заинтересовало?</h3>
                  <p className="text-gray-600 mb-4">Позвоните нам — быстро ответим на вопросы и подберем даты.</p>
                  <a href="tel:+998915340888" className="w-full inline-flex items-center justify-center btn btn-primary">Позвонить</a>
                  <div className="mt-3 text-xs text-gray-500">Работаем Пн–Пт 9:00–18:00, Сб 10:00–16:00</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {(pkg.sidebarImages ?? [pkg.image]).map((src, idx) => (
                      <img key={idx} src={src} alt={pkg.title} className="rounded-lg w-full object-contain bg-gray-100" />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default PackageDetailPage;