import React from 'react';
import { X } from 'lucide-react';
import { cities, tourCategories, languages } from '../../data/mockData';

interface FilterProps {
  filters: {
    city: string;
    category: string;
    language: string;
    minRating: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    city: string;
    category: string;
    language: string;
    minRating: string;
  }>>;
  applyFilters: () => void;
  resetFilters: () => void;
}

const GuideFilter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  applyFilters,
  resetFilters
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold">Фильтры</h2>
        <button
          onClick={resetFilters}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Сбросить
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Город */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Город
          </label>
          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="input-field py-1.5 sm:py-2 text-sm"
          >
            <option value="">Все города</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Категория */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field py-1.5 sm:py-2 text-sm"
          >
            <option value="">Все категории</option>
            {tourCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Язык */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Язык
          </label>
          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="input-field py-1.5 sm:py-2 text-sm"
          >
            <option value="">Все языки</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>

        {/* Минимальный рейтинг */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Минимальный рейтинг
          </label>
          <select
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            className="input-field py-1.5 sm:py-2 text-sm"
          >
            <option value="">Любой рейтинг</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
            <option value="3.0">3.0+</option>
          </select>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="btn btn-primary w-full mt-3 sm:mt-4 text-sm py-1.5 sm:py-2"
      >
        Применить фильтры
      </button>
    </div>
  );
};

export default GuideFilter;