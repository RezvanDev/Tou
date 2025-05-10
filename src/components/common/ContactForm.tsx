import React, { useState } from 'react';
import { sendToTelegram } from '../../api/telegram';
import { motion } from 'framer-motion';

interface ContactFormProps {
  className?: string;
  title?: string;
  description?: string;
}

const cities = [
  { id: 'tashkent', name: 'Ташкент' },
  { id: 'samarkand', name: 'Самарканд' },
  { id: 'bukhara', name: 'Бухара' },
  { id: 'khiva', name: 'Хива' }
];

const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  title = 'Оставьте заявку',
  description = 'Мы свяжемся с вами в ближайшее время'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendToTelegram(formData);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', city: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card max-w-xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl ${className}`}
    >
      <div className="mb-6 md:mb-8 text-center">
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2 md:mb-3"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base text-neutral-500"
        >
          {description}
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-black text-base"
            placeholder="Введите ваше имя"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Номер телефона
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-black text-base"
            placeholder="+998 XX XXX XX XX"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Город
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-black text-base"
          >
            <option value="">Выберите город</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Сообщение (необязательно)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-none text-black text-base"
            placeholder="Расскажите о ваших пожеланиях..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg bg-blue-600 text-white font-medium text-base sm:text-lg
              transform transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${isSubmitting ? 'animate-pulse' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
            ) : (
              'Отправить заявку'
            )}
          </button>
        </motion.div>

        {submitStatus === 'success' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-600 text-sm mt-3 sm:mt-4 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </motion.p>
        )}

        {submitStatus === 'error' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-600 text-sm mt-3 sm:mt-4 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Произошла ошибка. Попробуйте позже.
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
