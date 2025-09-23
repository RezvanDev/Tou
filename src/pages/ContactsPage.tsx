import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { sendToTelegram } from '../api/telegram';

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Контакты - Havas';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendToTelegram({
        name: formData.name,
        phone: formData.phone || 'Не указан',
        city: 'Общая заявка',
        message: formData.message + (formData.email ? `\n\nEmail: ${formData.email}` : '')
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы и помочь организовать незабываемое путешествие
            </p>
          </div>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактные данные */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Наши контакты</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Телефон</h3>
                    <p className="text-gray-600 mb-1">+99891 534 08 88</p>
                    <p className="text-sm text-gray-500">Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
                    <p className="text-gray-600 mb-1">info@havas.uz</p>
                    <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Адрес офиса</h3>
                    <p className="text-gray-600 mb-1">
                      г. Самарканд, бульвар
                    </p>
                    <p className="text-sm text-gray-500">Офис работает: Пн-Пт 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Время работы</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Понедельник - Пятница: 9:00 - 18:00</p>
                      <p>Суббота: 10:00 - 16:00</p>
                      <p>Воскресенье: Выходной</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Форма обратной связи */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Напишите нам</h3>
              
              {/* Уведомления */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</span>
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
                    <span className="font-medium">Ошибка при отправке сообщения. Попробуйте еще раз или свяжитесь с нами по телефону.</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+998 (__) ___-__-__"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Расскажите о ваших планах путешествия..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Отправляем...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Отправить сообщение</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Карта */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Наше местоположение</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Наш офис находится в центре Ташкента, в удобном для посещения месте
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-96 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Интерактивная карта</h3>
                <p className="text-gray-600 mb-4">
                  г. Самарканд, бульвар
                </p>
                <a 
                  href="https://maps.google.com/?q=Самарканд, бульвар"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Открыть в Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Дополнительная информация */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Как добраться</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>На автобусе:</strong> Маршруты до центра Самарканда</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>На такси:</strong> Яндекс.Такси, Uber, местные службы такси</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>На автомобиле:</strong> Парковка доступна рядом с офисом</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Полезная информация</h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Экстренная связь</h4>
                  <p className="text-sm">Для срочных вопросов звоните: +99891 534 08 88</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">WhatsApp</h4>
                  <p className="text-sm">Быстрая связь через WhatsApp: +99891 534 08 88</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Telegram</h4>
                  <p className="text-sm">Наш канал: @havas_tours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
