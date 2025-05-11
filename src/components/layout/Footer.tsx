import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

import logo from '../images/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-500 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* О нас */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="GuideUz Logo" className="w-12 h-12" />
              <span className="ml-2 text-xl font-montserrat font-bold">
                <span className="text-blue-400">GuideX</span>
                <span className="text-blue-500"></span>
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Исследуйте Узбекистан с профессиональными гидами. Открывайте для себя тысячелетнюю
              историю, богатую культуру и гостеприимство солнечного Узбекистана.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/guidexuz?igsh=MTQ1MHB0ZWlsZGd2eg==" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://t.me/Rezvanmax" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h4 className="text-white text-lg font-montserrat font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/guides" className="text-gray-300 hover:text-white transition-colors">Гиды</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Вход</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Регистрация</Link></li>
            </ul>
          </div>

          {/* Популярные города */}
          <div>
            <h4 className="text-white text-lg font-montserrat font-semibold mb-4">Популярные направления</h4>
            <ul className="space-y-2">
              <li><Link to="/guides?city=Ташкент" className="text-gray-300 hover:text-white transition-colors">Ташкент</Link></li>
              <li><Link to="/guides?city=Самарканд" className="text-gray-300 hover:text-white transition-colors">Самарканд</Link></li>
              <li><Link to="/guides?city=Бухара" className="text-gray-300 hover:text-white transition-colors">Бухара</Link></li>
              <li><Link to="/guides?city=Хива" className="text-gray-300 hover:text-white transition-colors">Хива</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white text-lg font-montserrat font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <span className="text-gray-300">г. Самарканд</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">+998 95 031-00-16</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">info@guideuz.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 GuideUz. Все права защищены.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="/terms" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;