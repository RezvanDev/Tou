import axios from 'axios';

const TELEGRAM_BOT_TOKEN = "7859150349:AAHdXyhqN1L7v6UNz0RUoOTFr3arR4NdqK0";
const TELEGRAM_CHAT_ID = -4772644044;

interface ContactFormData {
  name: string;
  phone: string;
  city: string;
  message?: string;
}

interface BookingData {
  guideName: string;
  tourName: string;
  date: string;
  startTime: string;
  duration: number;
  participants: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
}

export const sendToTelegram = async (data: ContactFormData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing');
  }

  const message = `
🆕 Новая заявка на подбор гида

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}
🏙 Город: ${data.city}
${data.message ? `💬 Сообщение: ${data.message}` : ''}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
  `;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    throw error;
  }
};

export const sendBookingToTelegram = async (data: BookingData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing');
  }

  const message = `
🎫 Новое бронирование экскурсии

👨‍💼 Гид: ${data.guideName}
🏛 Экскурсия: ${data.tourName}
📅 Дата: ${data.date}
⏰ Время начала: ${data.startTime}
⏱ Продолжительность: ${data.duration} ч.
👥 Количество участников: ${data.participants}
💰 Стоимость: ${data.totalPrice} сум

👤 Имя клиента: ${data.customerName}
📱 Телефон клиента: ${data.customerPhone}

⏰ Время бронирования: ${new Date().toLocaleString('ru-RU')}
  `;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending booking to Telegram:', error);
    throw error;
  }
}; 