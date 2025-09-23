import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'О нас - Havas';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О компании Havas</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Мы создаем незабываемые путешествия по Узбекистану, открывая для вас красоту и богатство этой удивительной страны
            </p>
          </div>
        </div>
      </section>

      {/* О компании */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Наша история</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>HAVAS</strong> — это надежная туристическая компания, основанная в 2010 году с целью показать миру уникальную красоту и богатую культуру Узбекистана.
                </p>
                <p>
                  За годы работы мы организовали тысячи туров для путешественников из разных стран мира. Наша команда состоит из опытных профессионалов, которые знают каждый уголок нашей страны и готовы поделиться этими знаниями с вами.
                </p>
                <p>
                  Мы специализируемся на создании индивидуальных и групповых туров, которые сочетают в себе исторические достопримечательности, культурные традиции и современные удобства.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/06/13/19/31/samarkand-2399795_1280.jpg" 
                  alt="Самарканд" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Самарканд</h3>
                  <p className="text-white/90">Жемчужина Шелкового пути</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Как мы работаем */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Как мы работаем</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Простой и прозрачный процесс организации вашего путешествия</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Консультация</h3>
              <p className="text-gray-600">Обсуждаем ваши пожелания, даты, бюджет и формат отдыха</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Индивидуальная программа</h3>
              <p className="text-gray-600">Подбираем маршруты, отели и экскурсии под ваши интересы</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Бронирование</h3>
              <p className="text-gray-600">Оформляем все брони и подтверждения, высылаем ваучеры</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">4</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Поддержка 24/7</h3>
              <p className="text-gray-600">Всегда на связи во время поездки, помогаем в любых вопросах</p>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 font-semibold">Лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600 font-semibold">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 font-semibold">Туристических маршрутов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600 font-semibold">Городов Узбекистана</div>
            </div>
          </div>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Готовы начать ваше путешествие по Узбекистану? Мы всегда рады помочь!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Телефон</h3>
              <p className="opacity-90">+99891 534 08 88</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="opacity-90">info@samarkand-tours.com</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Адрес</h3>
              <p className="opacity-90">г. Самарканд, бульвар</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
