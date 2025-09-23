import axios from 'axios';

const TELEGRAM_BOT_TOKEN = "7816188706:AAEXK_GPnqx40JPCP2NiWdq0Cx5nORwJslM";
const TELEGRAM_CHAT_ID = -4972107170;

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

interface TourBookingData {
  tourName: string;
  tourCity: string;
  tourPrice: number;
  tourDuration: string;
  tourCategory: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  message?: string;
  selectedDate?: string;
  selectedTime?: string;
  participants?: number;
}

export const sendToTelegram = async (data: ContactFormData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing');
  }

  const message = `
🆕 Новое сообщение с вопросом

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
        text: message
      }
    );

    return response.data;
  } catch (error: any) {
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
        text: message
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error sending booking to Telegram:', error);
    throw error;
  }
};

export const sendTourBookingToTelegram = async (data: TourBookingData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing');
  }

  const message = `
🎯 Новая заявка на тур

🏛 Тур: ${data.tourName}
🏙 Город: ${data.tourCity}
💰 Цена: $${data.tourPrice}
⏱ Продолжительность: ${data.tourDuration}
🏷 Категория: ${data.tourCategory}

👤 Имя клиента: ${data.customerName}
📱 Телефон: ${data.customerPhone}
${data.customerEmail ? `📧 Email: ${data.customerEmail}` : ''}
${data.participants ? `👥 Количество участников: ${data.participants}` : ''}
${data.selectedDate ? `📅 Выбранная дата: ${data.selectedDate}` : ''}
${data.selectedTime ? `⏰ Выбранное время: ${data.selectedTime}` : ''}
${data.message ? `💬 Сообщение: ${data.message}` : ''}

⏰ Время заявки: ${new Date().toLocaleString('ru-RU')}
  `;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error sending tour bosoking to Telegram:', error);
    throw error;
  }
};

