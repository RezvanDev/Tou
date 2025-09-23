import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'uz', name: 'Узбекский', flag: '🇺🇿', nativeName: "O'zbek" },
  { code: 'en', name: 'Английский', flag: '🇺🇸', nativeName: 'English' },
  { code: 'de', name: 'Немецкий', flag: '🇩🇪', nativeName: 'Deutsch' }
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Определить текущий язык из Google Translate (если он есть)
    const checkGoogleTranslate = () => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement && selectElement.value) {
        const initialLang = languages.find(lang => lang.code === selectElement.value);
        if (initialLang) {
          setCurrentLanguage(initialLang);
        }
      }
    };

    setTimeout(checkGoogleTranslate, 1500);

    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);

    // Глобальная функция из index.html
    if ((window as any).changeLanguage) {
      (window as any).changeLanguage(language.code);
    }
  };

  return (
    <div className="relative" ref={selectorRef}>
      {/* Кастомный селектор */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in-down">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                  currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{language.nativeName}</span>
                  <span className="text-xs text-gray-500">{language.name}</span>
                </div>
                {currentLanguage.code === language.code && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;