import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Languages, Clock, Award, Mail,  } from 'lucide-react';
import ReviewItem from '../components/guide/ReviewItem';
import { guides, reviews, Guide } from '../data/mockData';

const GuideProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [guideReviews, setGuideReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('about');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const guideId = parseInt(id);
      const foundGuide = guides.find(g => g.id === guideId);
      if (foundGuide) {
        setGuide(foundGuide);
        document.title = `${foundGuide.name} - GuideUz`;
        
        // Находим отзывы для этого гида
        const guideReviews = reviews.filter(review => review.guideId === guideId);
        setGuideReviews(guideReviews);
      }
    }
  }, [id]);

  if (!guide) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Гид не найден</h2>
        <p className="mb-8 text-gray-600">Запрашиваемый профиль гида не существует или был удален.</p>
        <Link to="/guides" className="btn btn-primary hover:scale-105 transition-transform">Вернуться к списку гидов</Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-beige-50 to-white min-h-screen py-12">
      <div className="container-custom">
        {/* Верхняя секция профиля */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Фото */}
            <div className="md:col-span-1 h-full">
              <div className="h-full aspect-square md:aspect-auto overflow-hidden">
                <img 
                  src={guide.avatar} 
                  alt={guide.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Основная информация */}
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-terracotta-500" />
                <span>{guide.city}</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{guide.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-500 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(guide.rating) ? 'fill-current' : ''} transition-colors duration-200`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-medium">{guide.rating}</span>
                </div>
                <span className="text-gray-500">
                  {guide.reviewCount} {guide.reviewCount % 10 === 1 && guide.reviewCount % 100 !== 11 ? 'отзыв' : 
                    (guide.reviewCount % 10 >= 2 && guide.reviewCount % 10 <= 4 && 
                    (guide.reviewCount % 100 < 10 || guide.reviewCount % 100 >= 20) ? 'отзыва' : 'отзывов')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <Languages className="w-6 h-6 text-terracotta-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Языки</p>
                    <p className="font-medium">{guide.languages.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  to={`/booking/${guide.id}`} 
                  className="btn btn-primary hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Забронировать
                </Link>
                <button className="btn btn-outline hover:bg-gray-50 transition-colors duration-300">
                  <Mail className="w-4 h-4 mr-2" />
                  Написать сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Вкладки */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8">
          <div className="border-b">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  selectedTab === 'about' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('about')}
              >
                О гиде
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  selectedTab === 'tours' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('tours')}
              >
                Экскурсии
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  selectedTab === 'reviews' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab('reviews')}
              >
                Отзывы
              </button>
            </nav>
          </div>
          
          <div className="p-8">
            {/* О гиде */}
            {selectedTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Биография</h3>
                  <p className="text-gray-700 leading-relaxed">{guide.bio}</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Сертификаты</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guide.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-4 rounded-xl">
                        <Award className="w-6 h-6 text-green-500 mr-3" />
                        <span className="font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Доступные даты</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {guide.availableDates.map((date, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors duration-200"
                      >
                        {new Date(date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Экскурсии */}
            {selectedTab === 'tours' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Предлагаемые экскурсии</h3>
                
                {guide.tours.length > 0 ? (
                  <div className="space-y-6">
                    {guide.tours.map(tour => (
                      <div key={tour.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="h-48 md:h-auto overflow-hidden">
                            <img 
                              src={tour.image} 
                              alt={tour.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="md:col-span-2 p-6">
                            <h4 className="text-2xl font-semibold mb-3 text-gray-800">{tour.title}</h4>
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                                <Clock className="w-4 h-4 mr-1.5 text-terracotta-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                                <MapPin className="w-4 h-4 mr-1.5 text-terracotta-500" />
                                <span>{tour.city}</span>
                              </div>
                             
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed">{tour.description}</p>
                            <Link 
                              to={`/booking/${guide.id}?tour=${tour.id}`}
                              className="btn btn-primary hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                              Забронировать
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Информация о экскурсиях пока не добавлена.</p>
                )}
              </div>
            )}
            
            {/* Отзывы */}
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">Отзывы клиентов</h3>
                  <button className="btn btn-outline hover:bg-gray-50 transition-colors duration-300">
                    Оставить отзыв
                  </button>
                </div>
                
                {guideReviews.length > 0 ? (
                  <div className="space-y-6">
                    {guideReviews.map(review => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">У этого гида пока нет отзывов.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfilePage;