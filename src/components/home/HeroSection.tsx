import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    'https://cdn.pixabay.com/photo/2017/06/13/19/31/samarkand-2399795_1280.jpg',
    'https://cdn.pixabay.com/photo/2013/10/17/14/04/samarkand-196901_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/10/26/12/10/uzbekistan-4579308_1280.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = () => {
    // Прокручиваем к секции туров
    const toursSection = document.getElementById('tours-section');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url('${image}')`,
              backgroundPosition: "center",
              transform: `scale(${index === currentImageIndex ? 1.1 : 1})`,
              transition: 'all 5s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Контент */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
            Туризм в Узбекистане:<br />
            <span className="text-blue-400">Ваша мечта в реальность</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-12 animate-fade-in-up animation-delay-200 max-w-3xl mx-auto leading-relaxed">
            Узнайте секреты восточной красоты и гостеприимства. Уникальные туры по самым интересным уголкам страны.
          </p>
          
          {/* Красивая кнопка */}
          <div className="animate-fade-in-up animation-delay-400">
            <button 
              onClick={handleStartJourney}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Начать путешествие
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>
          
          {/* Дополнительные элементы */}
          <div className="mt-16 animate-fade-in-up animation-delay-600">
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Профессиональные гиды</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Лучшие цены</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Безопасная оплата</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;