import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

import logo from '../images/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        <div className="pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* О компании */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src={logo} alt="Havas Logo" className="w-10 h-10" />
                <span className="ml-3 text-xl font-bold text-blue-400">Havas</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Надежная туристическая компания, предоставляющая услуги для путешественников по Узбекистану и Центральной Азии.
              </p>
              
              {/* Социальные сети */}
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/guidexuz?igsh=MTQ1MHB0ZWlsZGd2eg==" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://t.me/Rezvanmax" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Навигация */}
            <div>
              <h4 className="text-white font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/tours/uzbekistan" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Туры по Узбекистану
                  </Link>
                </li>
                <li>
                  <Link to="/tours/turkmenistan" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Туры по Туркменистану
                  </Link>
                </li>
                <li>
                  <Link to="/tours/kazakhstan" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Туры по Казахстану
                  </Link>
                </li>
                <li>
                  <Link to="/tours/kyrgyzstan" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Туры по Кыргызстану
                  </Link>
                </li>
                <li>
                  <Link to="/tours/tajikistan" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Туры по Таджикистану
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            {/* Популярные города */}
            <div>
              <h4 className="text-white font-semibold mb-4">Популярные города</h4>
              <div className="grid grid-cols-2 gap-1">
                {['Ташкент', 'Самарканд', 'Бухара', 'Хива', 'Фергана', 'Коканд', 'Андижан', 'Заамин'].map((city) => (
                  <Link
                    key={city}
                    to={`/city/${city.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <a href="tel:+998915340888" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +99891 534 08 88
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <a href="mailto:info@samarkand-tours.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@samarkand-tours.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400 text-sm">г. Самарканд, Узбекистан</span>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя часть */}
          <div className="pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2025 Havas. Все права защищены.
              </p>
              <div className="flex space-x-4 text-sm">
                <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                  Условия использования
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;