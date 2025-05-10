import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { reviews } from '../../data/mockData';

const ReviewsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const visibleReviews = 3;
  const maxSlides = Math.ceil(reviews.length / visibleReviews);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % maxSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, maxSlides]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentSlide(prev => (prev - 1 + maxSlides) % maxSlides);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentSlide(prev => (prev + 1) % maxSlides);
  };

  return (
    <section className="section" style={{ background: "linear-gradient(135deg, #f5f0e8 0%, #faf8f4 100%)" }}>
      <div className="container-custom">
        <div className="section-title">
          <h2 className="mb-4">Отзывы путешественников</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Узнайте, что говорят туристы о своем опыте с нашими гидами
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Стрелки навигации */}
          <div className="absolute -left-4 md:left-0 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -right-4 md:right-0 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              onClick={handleNext}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Слайдер */}
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-4"
                >
                  <div className="card p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">{review.userName}</h4>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {review.date}
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(maxSlides)].map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentSlide(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;