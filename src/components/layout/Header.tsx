import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, User, LogIn, MapPin, Clock, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ContactForm from '../common/ContactForm';
import logo from '../images/logo.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="flex items-center">
  <img src={logo} alt="GuideUz Logo" className="w-16 h-16" />
  <span className="ml-2 text-xl font-montserrat font-bold">
    <span className="text-blue-400">GuideX</span>
    <span className="text-blue-500"></span>
  </span>
</Link>

        {/* Навигация - десктоп */}
        <nav className="hidden lg:flex space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            Главная
          </Link>
          <Link 
            to="/guides" 
            className={`text-sm font-medium ${isActive('/guides') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            Гиды
          </Link>
          <div className="relative">
            <button
              className={`text-sm font-medium flex items-center space-x-1 ${
                isActive('/tours') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setToursDropdownOpen(!toursDropdownOpen)}
            >
              <span>Экскурсии</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {toursDropdownOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
                <Link to="/tours?category=history" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  Исторические
                </Link>
                <Link to="/tours?category=culture" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  Культурные
                </Link>
                <Link to="/tours?category=photo" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2 text-blue-400" />
                  Фото-туры
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Кнопки авторизации - десктоп */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                className="flex items-center space-x-2 font-medium"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="w-5 h-5" />
                <span>{user?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Профиль</Link>
                  <Link to="/bookings" className="block px-4 py-2 text-sm hover:bg-gray-100">Мои бронирования</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="font-medium hover:text-blue-500 transition-colors">Войти</Link>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="btn btn-primary"
              >
                Подобрать гида
              </button>
            </>
          )}
        </div>

        {/* Мобильный гамбургер */}
        <button 
          className="lg:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 flex flex-col space-y-4 animate-fade-in">
            <Link 
              to="/" 
              className={`font-medium py-2 ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/guides" 
              className={`font-medium py-2 ${isActive('/guides') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Гиды
            </Link>
            <div className="space-y-2">
              <div className="font-medium py-2 text-gray-700">Экскурсии</div>
              <div className="pl-4 space-y-2">
                <Link 
                  to="/tours?category=history" 
                  className="flex items-center py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  Исторические
                </Link>
                <Link 
                  to="/tours?category=culture" 
                  className="flex items-center py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  Культурные
                </Link>
                <Link 
                  to="/tours?category=photo" 
                  className="flex items-center py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <Camera className="w-4 h-4 mr-2 text-blue-400" />
                  Фото-туры
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`font-medium py-2 block ${isActive('/profile') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Профиль
                  </Link>
                  <Link 
                    to="/bookings" 
                    className={`font-medium py-2 block ${isActive('/bookings') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Мои бронирования
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="font-medium py-2 text-red-500 block"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`font-medium py-2 block ${isActive('/login') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Войти
                  </Link>
                  <button
                    onClick={() => {
                      setIsContactFormOpen(true);
                      setIsOpen(false);
                    }}
                    className="btn btn-primary mt-2 block text-center"
                  >
                    Подобрать гида
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно с формой */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Подобрать гида</h3>
              <button 
                onClick={() => setIsContactFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ContactForm 
                title="Оставьте заявку"
                description="Мы свяжемся с вами в ближайшее время"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;