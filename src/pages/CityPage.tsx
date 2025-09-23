import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowLeft, Camera, Users, Calendar, Heart, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { cities } from '../data/mockData';

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showAllAttractions, setShowAllAttractions] = useState<boolean>(false);
  
  const city = cities.find(c => c.id === cityId);
  
  // Определяем карточки для навигации
  const cards = city?.seoContent ? [
    { title: 'История города', content: city.seoContent.history },
    { title: 'Культура и традиции', content: city.seoContent.culture },
    { title: 'Местная кухня', content: city.seoContent.localCuisine },
    { title: 'Климат и погода', content: city.seoContent.climate },
    { title: 'Как добраться', content: city.seoContent.howToGetThere },
    { title: 'Размещение', content: city.seoContent.accommodation }
  ] : [];
  
  // Функция для перелистывания страницы
  const flipPage = (direction: 'left' | 'right', newIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationDirection(direction);
    
    setTimeout(() => {
      setActiveCard(newIndex);
      setAnimationDirection(null);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };
  
  // Обработчики для кнопок навигации
  const handlePrevious = () => {
    const newIndex = activeCard === 0 ? cards.length - 1 : activeCard - 1;
    flipPage('left', newIndex);
  };
  
  const handleNext = () => {
    const newIndex = activeCard === cards.length - 1 ? 0 : activeCard + 1;
    flipPage('right', newIndex);
  };
  
  // Обработчик для индикаторов
  const handleIndicatorClick = (index: number) => {
    if (isAnimating || index === activeCard) return;
    
    const direction = index > activeCard ? 'right' : 'left';
    flipPage(direction, index);
  };
  
  // Функции для навигации по галерее
  const galleryImages = city?.gallery || [city?.image, city?.image, city?.image, city?.image, city?.image, city?.image, city?.image, city?.image].filter(Boolean);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (city) {
      document.title = `Havas - ${city.name}, ${city.region}`;
    }
  }, [cityId]);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Город не найден</h1>
          <p className="text-gray-600 mb-8">Запрашиваемый город не найден в нашей базе данных</p>
          <Link 
            to="/" 
            className="btn btn-primary"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${city.image}')`,
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к турам
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {city.name}
                </h1>
                <p className="text-2xl md:text-3xl opacity-90 mb-6 font-light">
                  {city.region}
                </p>
                <p className="text-xl opacity-80 mb-8 leading-relaxed">
                  {city.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    <span className="font-medium">5.0 рейтинг</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Camera className="w-5 h-5 mr-2" />
                    <span className="font-medium">{city.attractions.length} достопримечательностей</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Heart className="w-5 h-5 mr-2 text-red-400" />
                    <span className="font-medium">Популярное место</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Быстрый заказ тура</h3>
                  <p className="text-white/80 mb-6">Забронируйте экскурсию прямо сейчас</p>
                  <div className="space-y-4">
                    <a 
                      href="tel:+998915340888"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Позвонить
                    </a>
                    <Link 
                      to="/contacts"
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Написать
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Описание города */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">О городе {city.name}</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {city.description}
                  </p>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">История и культура</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {city.name} является одним из самых значимых городов Узбекистана, с богатой историей, 
                    уходящей корнями в глубокую древность. Этот удивительный город сочетает в себе 
                    традиционную восточную архитектуру с современными элементами, создавая неповторимую 
                    атмосферу, которая привлекает туристов со всего мира.
                  </p>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Город славится своими уникальными достопримечательностями, каждая из которых 
                    рассказывает свою историю. Местные жители бережно сохраняют традиции и обычаи, 
                    передавая их из поколения в поколение. Здесь можно почувствовать настоящий дух 
                    Востока и окунуться в атмосферу древних легенд и преданий.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Основная информация</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">{city.region}</span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{city.attractions.length} достопримечательностей</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Высокий рейтинг</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Популярно у туристов</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Лучшее время для посещения</h3>
                  <p className="text-gray-700 mb-3">Весна (март-май) и осень (сентябрь-ноябрь) - идеальное время для комфортного путешествия.</p>
                  <p className="text-gray-700">Летом может быть жарко, но это не мешает наслаждаться красотами города.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Достопримечательности с фотографиями */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Достопримечательности {city.name}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Откройте для себя самые интересные и красивые места города, каждое из которых имеет свою уникальную историю
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showAllAttractions ? city.attractions : city.attractions.slice(0, 3)).map((attraction, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={city.attractionImages && city.attractionImages[index] ? city.attractionImages[index] : city.image} 
                      alt={attraction}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-lg font-bold mb-1">
                        {attraction}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {attraction}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Одно из самых популярных и значимых мест для посещения в {city.name}. 
                      Это место обязательно стоит включить в ваш маршрут путешествия.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>1-2 часа</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Кнопка "Показать еще" */}
            {city.attractions.length > 3 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllAttractions(!showAllAttractions)}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showAllAttractions ? 'Скрыть' : `Показать еще ${city.attractions.length - 3}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Галерея фотографий */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Фотогалерея {city.name}
              </h2>
              <p className="text-xl text-gray-600">
                Посмотрите, как выглядит город в разное время года
              </p>
            </div>
            
            {/* Основное изображение */}
            <div className="relative group mb-8">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={galleryImages[currentImageIndex]} 
                  alt={`${city.name} - фото ${currentImageIndex + 1}`}
                  className="w-full h-96 md:h-[500px] object-cover transition-all duration-500 ease-in-out"
                />
                
                {/* Кнопки навигации */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                
                {/* Счетчик изображений */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>
            
            {/* Миниатюры */}
            <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'ring-4 ring-blue-500 scale-110 shadow-lg' 
                      : 'hover:scale-105 shadow-md'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${city.name} - миниатюра ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Что включено в тур */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Что включено в тур по {city.name}
              </h2>
              <p className="text-xl text-gray-600">
                Полный пакет услуг для комфортного путешествия
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Включено */}
              <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Включено</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Профессиональный гид-экскурсовод</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Транспортное обслуживание</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Входные билеты в музеи</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Обед в местном ресторане</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Страхование путешественника</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Карта города и сувениры</span>
                  </li>
                </ul>
              </div>

              {/* Не включено */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Не включено</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Проживание в отеле</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Авиабилеты</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Личные расходы</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Дополнительные экскурсии</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Алкогольные напитки</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">Чаевые (по желанию)</span>
                  </li>
                </ul>
              </div>

              {/* Дополнительная информация */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Важно знать</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Продолжительность: 6-8 часов</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">Место встречи: центр города</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-gray-700">Размер группы: до 15 человек</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">Поддержка 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Гарантия возврата средств</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-gray-700">Бесплатная отмена за 24ч</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Туры по городу */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Туры по {city.name}
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Мы организуем для вас незабываемое путешествие с профессиональными гидами, 
              которые расскажут все секреты и истории этого удивительного города
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Индивидуальные туры</h3>
                <p className="opacity-90">Персональный маршрут под ваши интересы</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Групповые экскурсии</h3>
                <p className="opacity-90">Экономичные туры для небольших групп</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">VIP обслуживание</h3>
                <p className="opacity-90">Премиум сервис с максимальным комфортом</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contacts"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Заказать тур
              </Link>
              <a 
                href="tel:+998915340888"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                +99891 534 08 88
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Полезная информация */}
      {city.seoContent && (
        <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container-custom">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mb-4">
                  Полезная информация о {city.name}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Все, что нужно знать для комфортного путешествия в этот удивительный город
                </p>
              </div>
              
              <div className="relative">
                {(() => {
                  const currentCard = cards[activeCard];
                  
                  return (
                    <div className="relative group book-container">
                      <div className="absolute inset-0 bg-gray-200 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 page-shadow p-8 min-h-[400px] overflow-hidden transition-all duration-300 ${
                        animationDirection === 'left' ? 'flip-page-left' : 
                        animationDirection === 'right' ? 'flip-page-right' : 
                        'smooth-fade-in'
                      }`}>
                        <div className="flex items-center justify-between mb-6">
                          <button
                            onClick={handlePrevious}
                            disabled={isAnimating}
                            className={`p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 button-hover ${
                              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <ChevronLeft className="w-6 h-6 text-gray-700 transition-transform duration-200 group-hover:-translate-x-1" />
                          </button>
                          
                          <div className="flex-1 mx-4">
                            <h3 className={`text-3xl font-bold text-gray-800 text-center transition-all duration-300 ease-out ${
                              isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                            }`}>
                              {currentCard.title}
                            </h3>
                          </div>
                          
                          <button
                            onClick={handleNext}
                            disabled={isAnimating}
                            className={`p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 button-hover ${
                              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <ChevronRight className="w-6 h-6 text-gray-700 transition-transform duration-200 group-hover:translate-x-1" />
                          </button>
                        </div>
                        
                        <div className="text-center mb-6">
                          <div className="flex justify-center space-x-2">
                            {cards.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => handleIndicatorClick(index)}
                                disabled={isAnimating}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                  index === activeCard 
                                    ? 'bg-gray-800 scale-125 shadow-lg pulse-animation' 
                                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                                } ${
                                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div 
                            key={activeCard}
                            className={`text-gray-600 leading-relaxed text-lg text-center max-w-4xl mx-auto transition-all duration-300 ease-out ${
                              isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
                            }`}
                          >
                            {currentCard.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Советы путешественникам */}
      {city.seoContent && city.seoContent.tips && city.seoContent.tips.length > 0 && (
        <section className="section bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="container-custom">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  Советы путешественникам
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Практические рекомендации от местных экспертов для идеального путешествия
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {city.seoContent.tips.map((tip, index) => (
                  <div 
                    key={index}
                    className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20"
                  >
                    <div className="flex items-start mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                          Совет #{index + 1}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                      {tip}
                    </p>
                    <div className="mt-6 flex items-center text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Проверено экспертами</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Нужна дополнительная помощь?
                  </h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Наши эксперты готовы ответить на любые вопросы о путешествии в {city.name}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="tel:+998915340888"
                      className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                      Позвонить эксперту
                    </a>
                    <Link 
                      to="/contacts"
                      className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Задать вопрос
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default CityPage;
