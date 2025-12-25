import React, { useEffect } from 'react';
import certificate from '../components/images/personal_certificate.pdf';

const ProfessionalismInSustainabilityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Профессионализм в устойчивости - Havas';
  }, []);

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600"></div>

        {/* Floating Flags Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { flag: '🇺🇿', name: 'Узбекистан', delay: 0, duration: 15, x: '10%', y: '20%' },
            { flag: '🇰🇿', name: 'Казахстан', delay: 2, duration: 18, x: '85%', y: '30%' },
            { flag: '🇰🇬', name: 'Кыргызстан', delay: 4, duration: 20, x: '15%', y: '70%' },
            { flag: '🇹🇯', name: 'Таджикистан', delay: 1, duration: 16, x: '80%', y: '75%' },
            { flag: '🇹🇲', name: 'Туркменистан', delay: 3, duration: 17, x: '50%', y: '10%' },
          ].map((country, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: country.x,
                top: country.y,
                animation: `floatFlag ${country.duration}s ease-in-out infinite`,
                animationDelay: `${country.delay}s`,
              }}
            >
              <div className="text-2xl md:text-3xl drop-shadow-lg hover:scale-125 transition-transform duration-300">
                {country.flag}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Профессионализм в устойчивости
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md">
              2025 год — На Пути к Устойчивости
            </p>
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes floatFlag {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.7;
            }
            25% {
              transform: translate(30px, -40px) scale(1.1);
              opacity: 1;
            }
            50% {
              transform: translate(-20px, -60px) scale(0.9);
              opacity: 0.8;
            }
            75% {
              transform: translate(-30px, -20px) scale(1.05);
              opacity: 0.9;
            }
          }
        `}</style>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Introduction */}
            <div className="mb-12 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                В 2025 году компания Havas Tour Service достигла значительного прогресса в интеграции экологических и социальных принципов в свою деятельность:
              </p>
            </div>

            {/* Certificate Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-3xl">
                <img
                  src={certificate}
                  alt="Сертификат Менеджера по устойчивости Travelife"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Экологические Инновации */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                    Экологические Инновации и Сокращение Углеродного Следа
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Транспортная Эволюция:</p>
                    <p className="pl-4 mb-4 leading-relaxed">
                      Мы переоборудовали 100% нашего автопарка на газобаллонное оборудование (ГБО) и закупили электромобили для коротких маршрутов, что значительно сократило выбросы и зависимость от традиционного топлива.
                    </p>
                  </div>
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Отказ от Пластика:</p>
                    <p className="pl-4 mb-4 leading-relaxed">
                      Мы полностью исключили одноразовый пластик из наших транспортных операций, установив в автобусах и микроавтобусах 5-галлонные диспенсеры для заправки многоразовых бутылок и термосов наших туристов.
                    </p>
                  </div>
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Безбумажный Офис:</p>
                    <p className="pl-4 leading-relaxed">
                      Достигнут почти полный отказ от бумажного документооборота в пользу электронных систем, что стало нашим вкладом в сохранение лесов.
                    </p>
                  </div>
                </div>
              </div>

              {/* Социальное Воздействие */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                    Социальное Воздействие и Партнерство
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Поддержка Местной Экономики:</p>
                    <p className="pl-4 mb-4 leading-relaxed">
                      Мы пересмотрели нашу закупочную политику и полностью прекратили покупку сувениров в крупных торговых сетях, наладив прямое сотрудничество с местными семейными производителями и ремесленниками.
                    </p>
                  </div>
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Профессионализм в Устойчивости:</p>
                    <p className="pl-4 leading-relaxed">
                      Один из наших ключевых сотрудников успешно прошел обучение и получил персональный сертификат Менеджера по устойчивости Travelife, повышая нашу внутреннюю компетенцию.
                    </p>
                  </div>
                </div>
              </div>

              {/* Корпоративное Обязательство */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                    Корпоративное Обязательство
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="pl-8">
                    <p className="font-semibold text-lg mb-2">• Международные Стандарты:</p>
                    <p className="pl-4 leading-relaxed">
                      В настоящее время компания активно работает над получением престижного международного сертификата Travelife Partner, подтверждающего наше соответствие высоким стандартам ответственного туризма.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-8 text-center">
                <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                  Наше видение: Сделать каждое путешествие позитивным шагом для нашей планеты и сообществ, которые мы посещаем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalismInSustainabilityPage;