import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowDownAZ, ArrowDownZA, DollarSign } from 'lucide-react';
import GuideCard from '../components/guide/GuideCard';
import GuideFilter from '../components/guide/GuideFilter';
import { guides } from '../data/mockData';
import { Guide } from '../data/mockData';

const GuideCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>(guides);
  const [sortOption, setSortOption] = useState('rating-desc');
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    language: searchParams.get('language') || '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Каталог гидов - GuideUz';
    applyFiltersAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sortOption]);

  const applyFiltersAndSort = () => {
    // Применяем фильтры
    let result = [...guides];

    if (filters.city) {
      result = result.filter(guide => guide.city === filters.city);
    }

    if (filters.category) {
      result = result.filter(guide => 
        guide.tours.some(tour => tour.category === filters.category)
      );
    }

    if (filters.language) {
      result = result.filter(guide => 
        guide.languages.includes(filters.language)
      );
    }

    if (filters.minPrice) {
      result = result.filter(guide => 
        guide.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(guide => 
        guide.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.minRating) {
      result = result.filter(guide => 
        guide.rating >= parseFloat(filters.minRating)
      );
    }

    // Применяем сортировку
    switch (sortOption) {
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredGuides(result);
  };

  const applyFilters = () => {
    // Обновляем search параметры и применяем фильтры
    const params = new URLSearchParams();
    if (filters.city) params.set('city', filters.city);
    if (filters.category) params.set('category', filters.category);
    if (filters.language) params.set('language', filters.language);
    
    setSearchParams(params);
    applyFiltersAndSort();
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      category: '',
      language: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
    setSearchParams({});
  };

  return (
    <div className="py-10">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Поиск гидов</h1>
          <p className="text-gray-600">
            Найдите профессиональных гидов, которые помогут вам открыть для себя красоту и историю Узбекистана
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Фильтры */}
          <div className="lg:w-1/4 order-1">
            <GuideFilter 
              filters={filters} 
              setFilters={setFilters} 
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>

          {/* Список гидов */}
          <div className="lg:w-3/4 order-2">
            {/* Инструменты сортировки */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <span className="text-gray-600 mr-2">Найдено:</span>
                <span className="font-semibold">{filteredGuides.length} гидов</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Сортировать:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="input-field py-1 px-3"
                >
                  <option value="rating-desc">По рейтингу (высокий)</option>
                  <option value="rating-asc">По рейтингу (низкий)</option>
                  <option value="price-desc">По цене (высокая)</option>
                  <option value="price-asc">По цене (низкая)</option>
                  <option value="name-asc">По имени (А-Я)</option>
                  <option value="name-desc">По имени (Я-А)</option>
                </select>
              </div>
            </div>

            {/* Результаты */}
            {filteredGuides.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredGuides.map(guide => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Нет результатов</h3>
                <p className="text-gray-600 mb-4">
                  К сожалению, гидов, соответствующих вашим критериям, не найдено.
                </p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCatalogPage;