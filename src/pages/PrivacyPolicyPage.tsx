import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-beige-50 py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold">Политика конфиденциальности</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Общие положения</h2>
              <p className="text-gray-600 mb-4">
                Настоящая политика конфиденциальности описывает, как GuideUz собирает, использует и защищает информацию, 
                которую вы предоставляете при использовании нашего сервиса.
              </p>
              <p className="text-gray-600">
                Используя наш сервис, вы соглашаетесь с условиями данной политики конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Собираемая информация</h2>
              <p className="text-gray-600 mb-4">Мы собираем следующие виды информации:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Контактная информация (имя, email, телефон)</li>
                <li>Информация о бронированиях и предпочтениях</li>
                <li>Данные об использовании сервиса</li>
                <li>Информация об устройстве и браузере</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Использование информации</h2>
              <p className="text-gray-600 mb-4">Собранная информация используется для:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Обработки и подтверждения бронирований</li>
                <li>Улучшения качества обслуживания</li>
                <li>Связи с вами по вопросам бронирования</li>
                <li>Отправки важных уведомлений</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Защита информации</h2>
              <p className="text-gray-600 mb-4">
                Мы принимаем все необходимые меры для защиты вашей личной информации:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Используем защищенное соединение (HTTPS)</li>
                <li>Ограничиваем доступ к личной информации</li>
                <li>Регулярно обновляем системы безопасности</li>
                <li>Шифруем конфиденциальные данные</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Передача данных третьим лицам</h2>
              <p className="text-gray-600 mb-4">
                Мы не продаем и не передаем вашу личную информацию третьим лицам, за исключением случаев:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Когда это необходимо для обработки бронирования</li>
                <li>По требованию законодательства</li>
                <li>С вашего явного согласия</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Ваши права</h2>
              <p className="text-gray-600 mb-4">Вы имеете право:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Получить доступ к своим личным данным</li>
                <li>Исправить неточные данные</li>
                <li>Запросить удаление данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Контактная информация</h2>
              <p className="text-gray-600">
                Если у вас есть вопросы относительно нашей политики конфиденциальности, 
                пожалуйста, свяжитесь с нами:
              </p>
              <div className="mt-4 space-y-2 text-gray-600">
                <p>Email: privacy@guideuz.com</p>
                <p>Телефон: +998 95 031-00-16</p>
                <p>Адрес: г. Самарканд</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Изменения в политике</h2>
              <p className="text-gray-600">
                Мы оставляем за собой право вносить изменения в данную политику конфиденциальности. 
                Все изменения будут опубликованы на этой странице.
              </p>
            </section>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Последнее обновление: 1 мая 2025 года
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 