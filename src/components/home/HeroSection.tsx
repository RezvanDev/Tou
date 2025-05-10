import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Globe, Tag } from 'lucide-react';
import { cities, languages, tourCategories } from '../../data/mockData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (city) searchParams.append('city', city);
    if (date) searchParams.append('date', date.toISOString().split('T')[0]);
    if (language) searchParams.append('language', language);
    if (category) searchParams.append('category', category);
    
    navigate(`/guides?${searchParams.toString()}`);
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
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Откройте для себя Узбекистан с лучшими гидами
          </h1>
          <p className="text-2xl opacity-90 mb-8 animate-fade-in-up animation-delay-200">
            Персональные экскурсии с профессиональными гидами по самым удивительным местам Узбекистана
          </p>
        </div>

        {/* Форма поиска */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Город */}
            <div className="relative group">
              <div className="flex items-center text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2 group-hover:text-blue-500 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-gray-50 p-4 pl-12 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-100 appearance-none"
              >
                <option value="">Выберите город</option>
                {cities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            {/* Дата */}
            <div className="relative group">
              <div className="flex items-center text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2 group-hover:text-blue-500 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                placeholderText="Выберите дату"
                className="w-full bg-gray-50 p-4 pl-12 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-100"
              />
            </div>

            {/* Язык */}
            <div className="relative group">
              <div className="flex items-center text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2 group-hover:text-blue-500 transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-50 p-4 pl-12 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-100 appearance-none"
              >
                <option value="">Выберите язык</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Тип экскурсии */}
            <div className="relative group">
              <div className="flex items-center">
                <div className="flex items-center text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2 group-hover:text-blue-500 transition-colors">
                  <Tag className="w-5 h-5" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 p-4 pl-12 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-100 appearance-none"
                >
                  <option value="">Тип экскурсии</option>
                  {tourCategories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 px-6 rounded-xl transition-all duration-200 ml-2 hover:scale-105 hover:shadow-lg"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;