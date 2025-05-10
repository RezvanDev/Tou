import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularGuides from '../components/home/PopularGuides';
import PopularTours from '../components/home/PopularTours';
import CitiesSection from '../components/home/CitiesSection';
import ReviewsSection from '../components/home/ReviewsSection';
import ContactForm from '../components/common/ContactForm';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'GuideUz - Бронирование гидов по Узбекистану';
  }, []);
  
  return (
    <div>
      <HeroSection />
      <PopularGuides />
      <PopularTours />
      <CitiesSection />
      
      {/* Преимущества сервиса */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Лучшие гиды</h3>
              <p className="text-gray-600">Только проверенные профессионалы с опытом и глубокими знаниями</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Экономия времени</h3>
              <p className="text-gray-600">Быстрое бронирование без длительных звонков и переписок</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 text-terracotta-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасная оплата</h3>
              <p className="text-gray-600">Удобные способы оплаты с надежной защитой ваших данных</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Проверенные экскурсии и 100% возврат при отмене бронирования</p>
            </div>
          </div>
        </div>
      </section>
      {/* Призыв к действию */}
      <section 
        className="py-20 bg-cover bg-center text-white relative"
        style={{ 
          backgroundImage: "url('https://cdn.pixabay.com/photo/2017/06/13/19/31/samarkand-2399795_1280.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Готовы исследовать Узбекистан?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Забронируйте гида прямо сейчас и отправляйтесь в незабываемое путешествие по древним городам Великого Шелкового пути
              </p>
            </div>
            <div>
              <ContactForm 
                className="bg-white/95 backdrop-blur-sm"
                title="Оставьте заявку"
                description="Мы свяжемся с вами в ближайшее время"
              />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      
    </div>
  );
};

export default HomePage;