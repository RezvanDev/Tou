import React, { useState } from 'react';
import { X, Clock, MapPin, Users, CheckCircle, Send } from 'lucide-react';
import { Tour } from '../../data/mockData';
import { sendTourBookingToTelegram } from '../../api/telegram';

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ tour, isOpen, onClose }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    participants: 1,
    selectedDate: '',
    selectedTime: ''
  });
  
  if (!tour || !isOpen) return null;

  const handleBookTour = () => {
    setShowBookingForm(true);
  };

  const handleContactUs = () => {
    // Открываем телефонное приложение
    window.location.href = 'tel:+998915340888';
  };

  const handleBookingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendTourBookingToTelegram({
        tourName: tour.title,
        tourCity: tour.city,
        tourPrice: tour.price,
        tourDuration: tour.duration,
        tourCategory: tour.category || 'Тур',
        customerName: bookingData.name,
        customerPhone: bookingData.phone,
        customerEmail: bookingData.email,
        message: bookingData.message,
        participants: bookingData.participants,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setShowBookingForm(false);
        setBookingData({ name: '', phone: '', email: '', message: '', participants: 1, selectedDate: '', selectedTime: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error sending booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setShowBookingForm(false);
    setBookingData({ name: '', phone: '', email: '', message: '', participants: 1, selectedDate: '', selectedTime: '' });
    setSubmitStatus('idle');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img 
            src={tour.image} 
            alt={tour.title} 
            className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
          />
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{tour.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{tour.city}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-blue-500" />
                  <span>До {tour.maxParticipants} чел.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Price and Category */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tour.category ? tour.category.charAt(0).toUpperCase() + tour.category.slice(1) : 'Тур'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Описание тура</h3>
            <p className="text-gray-600 leading-relaxed">{tour.description}</p>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Что включено</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tour.includes.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Галерея</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img 
                    src={tour.image} 
                    className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Подробная информация</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Маршрут тура</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Начнем с посещения исторического центра города, где вы познакомитесь с архитектурными памятниками 
                  и культурным наследием. Затем отправимся к главным достопримечательностям, включая музеи, 
                  галереи и традиционные ремесленные мастерские.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">Особенности программы</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Профессиональный гид с многолетним опытом</li>
                  <li>• Интерактивные элементы и мастер-классы</li>
                  <li>• Дегустация местной кухни</li>
                  <li>• Фотосессия в традиционных костюмах</li>
                  <li>• Сувениры и памятные подарки</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Рекомендации</h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  Рекомендуем взять с собой удобную обувь для прогулок, головной убор и солнцезащитные очки. 
                  Камера или телефон для фото обязательны! Тур подходит для всех возрастов и уровней подготовки.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleBookTour}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Забронировать тур
            </button>
            <button 
              onClick={handleContactUs}
              className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Связаться с нами
            </button>
          </div>

          {/* Booking Form */}
          {showBookingForm && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Забронировать тур</h3>
              
              {/* Уведомления */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</span>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleBookingInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleBookingInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+998 (__) ___-__-__"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleBookingInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Количество участников
                    </label>
                    <select
                      name="participants"
                      value={bookingData.participants}
                      onChange={handleBookingInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {Array.from({ length: tour.maxParticipants }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'человек' : 'человек'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Предпочтительная дата
                    </label>
                    <input
                      type="date"
                      name="selectedDate"
                      value={bookingData.selectedDate}
                      onChange={handleBookingInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Предпочтительное время
                    </label>
                    <select
                      name="selectedTime"
                      value={bookingData.selectedTime}
                      onChange={handleBookingInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Выберите время</option>
                      {tour.startTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Дополнительные пожелания
                  </label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleBookingInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Расскажите о ваших пожеланиях..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Отправляем...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Отправить заявку</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourModal;
