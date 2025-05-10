import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { guides, tours } from '../data/mockData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapPin, Calendar, Clock, DollarSign, Users, Check } from 'lucide-react';
import { sendBookingToTelegram } from '../api/telegram';

interface BookingFormData {
  date: Date | null;
  startTime: string;
  duration: number;
  participants: number;
  totalPrice: number;
  tourId: number | null;
  customerName: string;
  customerPhone: string;
}

const BookingPage: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const tourIdParam = searchParams.get('tour');
  
  const [guide, setGuide] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: null,
    startTime: '10:00',
    duration: 2,
    participants: 2,
    totalPrice: 0,
    tourId: tourIdParam ? parseInt(tourIdParam) : null,
    customerName: user?.name || '',
    customerPhone: user?.phone || ''
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Бронирование - GuideUz';
    
    if (guideId) {
      const foundGuide = guides.find(g => g.id === parseInt(guideId));
      setGuide(foundGuide);
      
      // Устанавливаем выбранный тур, если есть
      if (tourIdParam) {
        const tourId = parseInt(tourIdParam);
        const foundTour = tours.find(t => t.id === tourId);
        setSelectedTour(foundTour);
        
        // Обновляем totalPrice
        if (foundTour) {
          setBookingData(prev => ({
            ...prev,
            totalPrice: foundTour.price * prev.participants
          }));
        }
      }
    }
  }, [guideId, tourIdParam, user]);
  
  // Обновление цены при изменении параметров
  useEffect(() => {
    if (!guide) return;
    
    let price = 0;
    if (selectedTour) {
      // Фиксированная цена тура за человека
      price = selectedTour.price * bookingData.participants;
    } else {
      // Почасовая ставка гида
      price = guide.price * bookingData.duration * bookingData.participants;
    }
    
    setBookingData(prev => ({
      ...prev,
      totalPrice: price
    }));
  }, [bookingData.duration, bookingData.participants, guide, selectedTour]);
  
  // Обработчики изменения формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'participants' || name === 'duration' ? parseInt(value) : value
    }));
  };
  
  const handleDateChange = (date) => {
    setBookingData(prev => ({ ...prev, date }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка авторизации
    if (!isAuthenticated) {
      navigate('/login?redirect=booking');
      return;
    }
    
    try {
      // Отправляем уведомление в Telegram
      await sendBookingToTelegram({
        guideName: guide.name,
        tourName: selectedTour ? selectedTour.title : 'Индивидуальная экскурсия',
        date: bookingData.date.toLocaleDateString('ru-RU'),
        startTime: bookingData.startTime,
        duration: selectedTour ? parseInt(selectedTour.duration) : bookingData.duration,
        participants: bookingData.participants,
        totalPrice: bookingData.totalPrice,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone
      });
      
      // В реальном приложении здесь был бы запрос к API для сохранения бронирования
    setBookingStep(2);
    } catch (error) {
      console.error('Error booking tour:', error);
      // Здесь можно добавить обработку ошибок
    }
  };
  
  if (!guide) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Гид не найден</h2>
        <p>Запрашиваемый гид не существует или был удален.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-beige-50 py-10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Бронирование экскурсии</h1>
          
          {bookingStep === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Форма бронирования */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Детали бронирования</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Выбор даты */}
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Выберите дату
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <DatePicker
                          selected={bookingData.date}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          filterDate={date => {
                            // Разрешаем выбирать только доступные даты у гида или тура
                            const dateStr = date.toISOString().split('T')[0];
                            return selectedTour 
                              ? selectedTour.availableDates.includes(dateStr)
                              : guide.availableDates.includes(dateStr);
                          }}
                          dateFormat="dd.MM.yyyy"
                          placeholderText="Выберите дату"
                          className="w-full pl-10 input-field"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Выбор времени */}
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Время начала
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Clock className="w-5 h-5" />
                        </div>
                        <select
                          name="startTime"
                          value={bookingData.startTime}
                          onChange={handleInputChange}
                          className="w-full pl-10 input-field"
                          required
                        >
                          {selectedTour 
                            ? selectedTour.startTimes.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))
                            : ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))
                          }
                        </select>
                      </div>
                    </div>
                    
                    {/* Продолжительность (если не выбран тур) */}
                    {!selectedTour && (
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                          Продолжительность (часов)
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Clock className="w-5 h-5" />
                          </div>
                          <select
                            name="duration"
                            value={bookingData.duration}
                            onChange={handleInputChange}
                            className="w-full pl-10 input-field"
                            required
                          >
                            <option value="2">2 часа</option>
                            <option value="3">3 часа</option>
                            <option value="4">4 часа</option>
                            <option value="6">6 часов</option>
                            <option value="8">8 часов</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {/* Количество участников */}
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Количество участников
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <input
                          type="number"
                          name="participants"
                          value={bookingData.participants}
                          onChange={handleInputChange}
                          min="1"
                          max={selectedTour ? selectedTour.maxParticipants : 10}
                          className="w-full pl-10 input-field"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Контактные данные */}
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={bookingData.customerName}
                        onChange={handleInputChange}
                        className="w-full input-field"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Номер телефона
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={bookingData.customerPhone}
                        onChange={handleInputChange}
                        className="w-full input-field"
                        required
                        placeholder="+998 XX XXX XX XX"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full btn btn-primary"
                    >
                      Забронировать
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Информация о гиде и туре */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Информация о бронировании</h2>
                  
                  <div className="space-y-4">
                      <div>
                      <h3 className="font-medium text-gray-700">Гид</h3>
                      <p className="text-gray-900">{guide.name}</p>
                  </div>
                  
                  {selectedTour && (
                      <div>
                        <h3 className="font-medium text-gray-700">Экскурсия</h3>
                        <p className="text-gray-900">{selectedTour.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{selectedTour.duration}</p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Стоимость</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {bookingData.totalPrice.toLocaleString()} сум
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedTour 
                          ? `за ${bookingData.participants} ${bookingData.participants === 1 ? 'человека' : 'человек'}`
                          : `за ${bookingData.duration} ${bookingData.duration === 1 ? 'час' : 'часа'} для ${bookingData.participants} ${bookingData.participants === 1 ? 'человека' : 'человек'}`
                        }
                      </p>
                    </div>
                    
                    {selectedTour && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">В стоимость включено:</h3>
                        <ul className="space-y-2">
                          {selectedTour.includes.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <Check className="w-4 h-4 mr-2 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Бронирование успешно!</h2>
              <p className="text-gray-600 mb-6">
                Мы отправили подтверждение на ваш email и телефон.
                Гид свяжется с вами в ближайшее время для уточнения деталей.
              </p>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-primary"
                >
                  Вернуться на главную
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;