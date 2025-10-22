import React, { useEffect } from 'react';

// Импорт изображений из папки misions
import mission1 from '../components/images/misions/photo_2025-10-19 23.28.42.jpeg';
import mission2 from '../components/images/misions/photo_2025-10-19 23.28.45.jpeg';
import mission3 from '../components/images/misions/photo_2025-10-19 23.28.47.jpeg';
import mission4 from '../components/images/misions/photo_2025-10-19 23.28.51.jpeg';

const SustainabilityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Устойчивость - Havas';
  }, []);

  const missionImages = [mission1, mission2, mission3, mission4];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* English content for Google Translate - hidden */}
      <div style={{ display: 'none' }}>
        <span>Устойчивость</span>
        <h1>Sustainability</h1>
        <h2>Mission of Havas Tourism Service in Sustainable Development</h2>
        <p>Havas Tourism Service sees tourism as a powerful tool for positive change. Our mission is to develop sustainable tourism that:</p>
        <h3>Preserves natural and cultural values</h3>
        <p>Protects biodiversity, natural landscapes, and historical and cultural landmarks, supporting their conservation and restoration.</p>
        <h3>Respects human dignity and cultural diversity</h3>
        <p>Fosters tolerance and respect for the traditions, customs, and religions of local communities, excluding any form of discrimination.</p>
        <h3>Minimizes environmental impact</h3>
        <p>Reduces carbon emissions, cuts waste, and promotes eco-friendly transportation and accommodation.</p>
        <h3>Supports women and social entrepreneurship</h3>
        <p>Collaborates with women's groups and initiatives, expanding opportunities for women in the tourism industry.</p>
        <h3>Develops responsible business practices</h3>
        <p>Encourages transparency and sustainable growth, supporting small and medium-sized businesses in local regions.</p>
        <h3>Builds shared values among clients and partners</h3>
        <p>Creates tours for conscious travelers who share our principles of responsibility and respect.</p>
        <h3>Educates and inspires</h3>
        <p>Provides training for employees, partners, and clients on the principles of sustainable tourism.</p>
        <h3>Implements innovations for sustainability</h3>
        <p>Uses modern technologies and solutions to enhance environmental and social impact.</p>
        <h3>Supports local communities</h3>
        <p>Invests in local community development, creating jobs and improving the quality of life for local residents.</p>
        <h3>Promotes ethical tourism</h3>
        <p>Ensures fair distribution of tourism revenues and protects the rights of local workers in the tourism sector.</p>
        <h2>Our Mission in Action</h2>
        <p>Havas Tourism Service strives to be a leader in responsible tourism, creating journeys that benefit nature, society, and culture.</p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Устойчивость
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Миссия Havas Tourism Service в области устойчивого развития
            </p>
          </div>
        </div>
      </section>

      {/* Mission Description */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
              Havas Tourism Service видит в туризме мощный инструмент позитивных изменений. Наша миссия — развивать устойчивый туризм, который:
            </p>
          </div>
        </div>
      </section>

      {/* Mission Points */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Сохраняет природные и культурные ценности
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Защищает биоразнообразие, природные ландшафты и историко-культурные памятники, поддерживая их сохранение и восстановление.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Уважает человеческое достоинство и культурное разнообразие
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Воспитывает толерантность и уважение к традициям, обычаям и религиям местных сообществ, исключая любые формы дискриминации.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Минимизирует воздействие на окружающую среду
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Снижает выбросы углерода, сокращает отходы и продвигает экологически чистый транспорт и размещение.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Поддерживает женщин и социальное предпринимательство
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Сотрудничает с женскими группами и инициативами, расширяя возможности для женщин в туристической индустрии.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Развивает ответственные бизнес-практики
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Поощряет прозрачность и устойчивый рост, поддерживая малый и средний бизнес в местных регионах.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Создает общие ценности среди клиентов и партнеров
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Создает туры для сознательных путешественников, которые разделяют наши принципы ответственности и уважения.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Обучает и вдохновляет
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Предоставляет обучение для сотрудников, партнеров и клиентов по принципам устойчивого туризма.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Внедряет инновации для устойчивости
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Использует современные технологии и решения для повышения экологического и социального воздействия.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Поддерживает местные сообщества
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Инвестирует в развитие местных сообществ, создавая рабочие места и улучшая качество жизни местных жителей.
                </p>
              </div>
              
              <div className="bg-beige-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Продвигает этичный туризм
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Обеспечивает справедливое распределение доходов от туризма и защищает права местных работников в туристической сфере.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Images */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Наша миссия в действии
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionImages.map((image, index) => (
                <div key={index} className="group">
                  <div className="aspect-square overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                    <img
                      src={image}
                      alt={`Миссия ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Havas Tourism Service стремится быть лидером в области ответственного туризма, создавая путешествия, которые приносят пользу природе, обществу и культуре.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
