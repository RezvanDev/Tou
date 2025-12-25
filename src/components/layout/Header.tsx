import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import ContactForm from '../common/ContactForm';
import LanguageSelector from '../common/LanguageSelector';
import logo from '../images/logo.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [isSustainabilityDropdownOpen, setIsSustainabilityDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие меню при навигации
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.tours-dropdown')) {
        setIsToursDropdownOpen(false);
      }
      if (!target.closest('.sustainability-dropdown')) {
        setIsSustainabilityDropdownOpen(false);
      }
    };

    if (isToursDropdownOpen || isSustainabilityDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToursDropdownOpen, isSustainabilityDropdownOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-3'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Incoming Logo"
            className="w-24 h-24 sm:w-20 sm:h-20"
          />
        </Link>

        {/* Навигация - десктоп */}
        <nav className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            Главная
          </Link>
          <div className="relative tours-dropdown">
            <button
              onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
              className={`text-sm font-medium flex items-center ${isActive('/tours') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Туры
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isToursDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToursDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/tours/turkmenistan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  Туркменистан
                </Link>
                <Link
                  to="/tours/kazakhstan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  Казахстан
                </Link>
                <Link
                  to="/tours/kyrgyzstan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  Кыргызстан
                </Link>
                <Link
                  to="/tours/tajikistan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsToursDropdownOpen(false)}
                >
                  Таджикистан
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/packages"
            className={`text-sm font-medium ${isActive('/packages') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            Тур пакеты
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            О нас
          </Link>
          <div className="relative sustainability-dropdown">
            <button
              onClick={() => setIsSustainabilityDropdownOpen(!isSustainabilityDropdownOpen)}
              className={`text-sm font-medium flex items-center ${isActive('/mission') || isActive('/mission/professionalism') || isActive('/mission/policies') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Миссия
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isSustainabilityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSustainabilityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/mission"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsSustainabilityDropdownOpen(false)}
                >
                  Миссия
                </Link>
                <Link
                  to="/mission/professionalism"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsSustainabilityDropdownOpen(false)}
                >
                  Профессионализм в устойчивости
                </Link>
                <Link
                  to="/mission/policies"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsSustainabilityDropdownOpen(false)}
                >
                  Политики устойчивости
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/contacts"
            className={`text-sm font-medium ${isActive('/contacts') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            Контакты
          </Link>
        </nav>

        {/* Кнопки - десктоп */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Селектор языков */}
          <LanguageSelector />

          <a
            href="tel:+998915340888"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            +99891 534 08 88
          </a>
          <button
            onClick={() => setIsContactFormOpen(true)}
            className="btn btn-primary text-sm py-2 px-4"
          >
            Оставить заявку
          </button>
        </div>

        {/* Мобильный гамбургер */}
        <button
          className="lg:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md py-3 px-4 flex flex-col space-y-3 animate-fade-in">
            <Link
              to="/"
              className={`font-medium py-1.5 text-sm ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <div className="tours-dropdown">
              <button
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className={`font-medium py-1.5 text-sm flex items-center justify-between w-full ${isActive('/tours') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Туры
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToursDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToursDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    to="/tours/turkmenistan"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsToursDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Туркменистан
                  </Link>
                  <Link
                    to="/tours/kazakhstan"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsToursDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Казахстан
                  </Link>
                  <Link
                    to="/tours/kyrgyzstan"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsToursDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Кыргызстан
                  </Link>
                  <Link
                    to="/tours/tajikistan"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsToursDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Таджикистан
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/packages"
              className={`font-medium py-1.5 text-sm ${isActive('/packages') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Тур пакеты
            </Link>
            <Link
              to="/about"
              className={`font-medium py-1.5 text-sm ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              О нас
            </Link>
            <div className="sustainability-dropdown">
              <button
                onClick={() => setIsSustainabilityDropdownOpen(!isSustainabilityDropdownOpen)}
                className={`font-medium py-1.5 text-sm flex items-center justify-between w-full ${isActive('/mission') || isActive('/mission/professionalism') || isActive('/mission/policies') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Миссия
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSustainabilityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSustainabilityDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    to="/mission"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsSustainabilityDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Миссия
                  </Link>
                  <Link
                    to="/mission/professionalism"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsSustainabilityDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Профессионализм в устойчивости
                  </Link>
                  <Link
                    to="/mission/policies"
                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setIsSustainabilityDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Политики устойчивости
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/contacts"
              className={`font-medium py-1.5 text-sm ${isActive('/contacts') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Контакты
            </Link>
            <div className="border-t border-gray-200 pt-3 mt-1">
              {/* Селектор языков для мобильных */}
              <div className="mb-3">
                <LanguageSelector />
              </div>

              <a
                href="tel:+998915340888"
                className="block font-medium py-1.5 text-sm text-gray-700 hover:text-blue-600"
              >
                +99891 534 08 88
              </a>
              <button
                onClick={() => {
                  setIsContactFormOpen(true);
                  setIsOpen(false);
                }}
                className="btn btn-primary mt-2 block text-center text-sm py-2"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно с формой */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto my-4">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="text-base font-semibold">Оставить заявку</h3>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <ContactForm
                title="Оставьте заявку"
                description="Наш менеджер перезвонит вам в течение 30 минут"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
