import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Bookmark, Calendar, LogOut } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Имитация загрузки бронирований
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Личный кабинет - GuideUz';
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Имитация загрузки данных о бронированиях
    const mockBookings = [
      {
        id: 1,
        guideName: 'Азиз Рахимов',
        guideAvatar: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tourName: 'Исторический тур по Самарканду',
        date: '15.05.2025',
        time: '10:00',
        participants: 2,
        price: 90,
        status: 'confirmed'
      },
      {
        id: 2,
        guideName: 'Карина Алиева',
        guideAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tourName: 'Кулинарный тур по Ташкенту',
        date: '20.05.2025',
        time: '12:00',
        participants: 3,
        price: 105,
        status: 'pending'
      }
    ];
    
    setBookings(mockBookings);
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isAuthenticated || !user) {
    return null; // Будет перенаправлено в useEffect
  }
  
  // Определяем контент в зависимости от роли и активной вкладки
  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Мой профиль</h2>
          
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4 md:mb-0 md:mr-6">
              <User className="w-16 h-16" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {user.role === 'tourist' ? 'Турист' : 'Гид'}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Личная информация</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя и фамилия
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    defaultValue={user.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    defaultValue={user.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+998 XX XXX-XX-XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Язык интерфейса
                  </label>
                  <select className="input-field">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="uz">O'zbek</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="btn btn-primary">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (activeTab === 'bookings') {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Мои бронирования</h2>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map(booking => (
                <div key={booking.id} className="border rounded-lg overflow-hidden">
                  <div className="border-b bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{booking.date}, {booking.time}</span>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидает подтверждения'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start">
                      <img 
                        src={booking.guideAvatar} 
                        alt={booking.guideName} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{booking.tourName}</h3>
                        <p className="text-gray-600">Гид: {booking.guideName}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          Количество человек: {booking.participants}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-semibold text-blue-500">${booking.price}</span>
                          <div className="space-x-2">
                            <button className="btn btn-outline py-1 px-3 text-sm">
                              Подробнее
                            </button>
                            {booking.status !== 'confirmed' && (
                              <button className="btn btn-primary py-1 px-3 text-sm">
                                Оплатить
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет бронирований</h3>
              <p className="text-gray-500 mb-4">
                У вас пока нет забронированных экскурсий.
              </p>
              <button 
                onClick={() => navigate('/guides')}
                className="btn btn-primary"
              >
                Найти гида
              </button>
            </div>
          )}
        </div>
      );
    } else if (activeTab === 'settings') {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Настройки</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Смена пароля</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Текущий пароль
                  </label>
                  <input
                    type="password"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите новый пароль
                  </label>
                  <input
                    type="password"
                    className="input-field"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Изменить пароль
                </button>
              </form>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Уведомления</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Email-уведомления о бронированиях</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email-рассылка с новыми предложениями</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-red-600 mb-3">Удаление аккаунта</h3>
              <p className="text-gray-600 mb-4">
                Все ваши данные будут удалены. Это действие нельзя отменить.
              </p>
              <button className="btn bg-red-500 hover:bg-red-600 text-white">
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-beige-50 py-10">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковое меню */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              
              <nav className="p-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 text-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span>Мой профиль</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-blue-50 text-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className="w-5 h-5 mr-3" />
                  <span>Мои бронирования</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-blue-50 text-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Настройки</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Выйти</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;