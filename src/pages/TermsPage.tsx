import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-beige-50 py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <FileText className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold">Условия использования</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Общие положения</h2>
              <p className="text-gray-600 mb-4">
                Настоящие условия использования регулируют отношения между GuideUz и пользователями 
                нашего сервиса по подбору и бронированию гидов.
              </p>
              <p className="text-gray-600">
                Используя наш сервис, вы соглашаетесь с данными условиями использования.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Регистрация и аккаунт</h2>
              <p className="text-gray-600 mb-4">При регистрации вы обязуетесь:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Предоставить достоверную информацию</li>
                <li>Поддерживать актуальность данных</li>
                <li>Нести ответственность за действия в своем аккаунте</li>
                <li>Не передавать доступ к аккаунту третьим лицам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Бронирование и оплата</h2>
              <p className="text-gray-600 mb-4">При бронировании экскурсии:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Вы подтверждаете свое согласие с условиями экскурсии</li>
                <li>Обязуетесь оплатить услугу в установленные сроки</li>
                <li>Принимаете правила отмены и возврата средств</li>
                <li>Соглашаетесь с политикой переноса дат</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Обязанности гидов</h2>
              <p className="text-gray-600 mb-4">Гиды обязуются:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Предоставлять качественные услуги</li>
                <li>Соблюдать оговоренное время и маршрут</li>
                <li>Иметь необходимые разрешения и сертификаты</li>
                <li>Соблюдать правила безопасности</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Отмена и возврат</h2>
              <p className="text-gray-600 mb-4">Правила отмены бронирования:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Отмена за 48 часов - полный возврат средств</li>
                <li>Отмена за 24 часа - возврат 50% стоимости</li>
                <li>Отмена менее чем за 24 часа - возврат не производится</li>
                <li>При форс-мажоре - индивидуальное рассмотрение</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Ответственность</h2>
              <p className="text-gray-600 mb-4">
                GuideUz не несет ответственности за:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Действия гидов вне рамок согласованной программы</li>
                <li>Форс-мажорные обстоятельства</li>
                <li>Потерю или повреждение личных вещей</li>
                <li>Задержки, не зависящие от сервиса</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Интеллектуальная собственность</h2>
              <p className="text-gray-600 mb-4">
                Весь контент на сайте GuideUz, включая:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Тексты и описания</li>
                <li>Фотографии и изображения</li>
                <li>Логотипы и торговые марки</li>
                <li>Дизайн и программный код</li>
              </ul>
              <p className="text-gray-600 mt-4">
                является интеллектуальной собственностью GuideUz и защищено законодательством.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Изменение условий</h2>
              <p className="text-gray-600">
                Мы оставляем за собой право изменять данные условия использования. 
                Все изменения вступают в силу после их публикации на сайте.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Контактная информация</h2>
              <p className="text-gray-600">
                По всем вопросам, связанным с условиями использования, обращайтесь:
              </p>
              <div className="mt-4 space-y-2 text-gray-600">
                <p>Email: terms@guideuz.com</p>
                <p>Телефон: +998 95 031-00-16</p>
                <p>Адрес: г. Самарканд</p>
              </div>
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

export default TermsPage; 