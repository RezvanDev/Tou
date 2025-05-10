import React from 'react';
import { X } from 'lucide-react';
import { cities, tourCategories, languages } from '../../data/mockData';

interface GuideFilterProps {
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

const GuideFilter: React.FC<GuideFilterProps> = ({ 
  filters, 
  setFilters, 
  applyFilters, 
  resetFilters 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-gray-500 flex items-center hover:text-red-500"
        >
          <X className="w-4 h-4 mr-1" /> Сбросить
        </button>
      </div>

      <div className="space-y-5">
        {/* Город */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Город
          </label>
          <select
            id="city"
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Все города</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Категория */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Тип экскурсии
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Все типы</option>
            {tourCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Язык */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Язык
          </label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Все языки</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Рейтинг */}
        <div>
          <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
            Минимальный рейтинг
          </label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Любой рейтинг</option>
            <option value="3">3+ звезды</option>
            <option value="4">4+ звезды</option>
            <option value="4.5">4.5+ звезды</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          className="btn btn-primary w-full mt-6"
        >
          Применить фильтры
        </button>
      </div>
    </div>
  );
};

export default GuideFilter;