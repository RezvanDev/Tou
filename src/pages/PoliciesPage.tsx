import React, { useEffect, useState } from 'react';
import { FileText, ChevronRight, Download, Loader2 } from 'lucide-react';
import mammoth from 'mammoth';

// Import documents
import accomodationPolicy from '../components/docs/Accomodation Policy.docx';
import emergencyProtocol from '../components/docs/Emergency protocol.docx';
import energySavingPolicy from '../components/docs/Energy Saving Policy.docx';
import hrPolicy from '../components/docs/HR Policy_English.docx';
import privacyPolicy from '../components/docs/Privacy Policy.docx';
import purchasingPolicy from '../components/docs/Purchasing Policy.docx';
import sustainableExcursion from '../components/docs/Sustainable Excursion Policy for Havas Tour Service.docx';
import transportationPolicy from '../components/docs/Transportation Policy.docx';
import responsibleTraveler from '../components/docs/Your Responsible Traveler Code of Conduct for Uzbekistan.docx';

interface PolicyDoc {
    id: string;
    title: string;
    file: string;
}

const policies: PolicyDoc[] = [
    { id: 'accommodation', title: 'Accommodation Policy', file: accomodationPolicy },
    { id: 'emergency', title: 'Emergency Protocol', file: emergencyProtocol },
    { id: 'energy', title: 'Energy Saving Policy', file: energySavingPolicy },
    { id: 'hr', title: 'HR Policy', file: hrPolicy },
    { id: 'privacy', title: 'Privacy Policy', file: privacyPolicy },
    { id: 'purchasing', title: 'Purchasing Policy', file: purchasingPolicy },
    { id: 'excursion', title: 'Sustainable Excursion Policy', file: sustainableExcursion },
    { id: 'transportation', title: 'Transportation Policy', file: transportationPolicy },
    { id: 'conduct', title: 'Responsible Traveler Code of Conduct', file: responsibleTraveler },
];

const PoliciesPage: React.FC = () => {
    const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Политики устойчивости - Havas';
    }, []);

    const handleViewPolicy = async (policy: PolicyDoc) => {
        // If already selected, do nothing (or maybe toggle? let's just do nothing for now)
        if (selectedPolicyId === policy.id) return;

        setSelectedPolicyId(policy.id);
        setIsLoading(true);
        setHtmlContent(''); // Clear previous content

        try {
            const response = await fetch(policy.file);
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setHtmlContent(result.value);
        } catch (error) {
            console.error('Error parsing document:', error);
            setHtmlContent('<div class="p-4 bg-red-50 text-red-600 rounded">Не удалось загрузить документ. Пожалуйста, воспользуйтесь скачиванием.</div>');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-beige-50">
            {/* Hero Section */}
            <section className="relative text-white py-20 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600"></div>

                {/* Floating Flags Animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[
                        { flag: '🇺🇿', name: 'Узбекистан', delay: 0, duration: 15, x: '10%', y: '20%' },
                        { flag: '🇰🇿', name: 'Казахстан', delay: 2, duration: 18, x: '85%', y: '30%' },
                        { flag: '🇰🇬', name: 'Кыргызстан', delay: 4, duration: 20, x: '15%', y: '70%' },
                        { flag: '🇹🇯', name: 'Таджикистан', delay: 1, duration: 16, x: '80%', y: '75%' },
                        { flag: '🇹🇲', name: 'Туркменистан', delay: 3, duration: 17, x: '50%', y: '10%' },
                    ].map((country, index) => (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                left: country.x,
                                top: country.y,
                                animation: `floatFlag ${country.duration}s ease-in-out infinite`,
                                animationDelay: `${country.delay}s`,
                            }}
                        >
                            <div className="text-2xl md:text-3xl drop-shadow-lg hover:scale-125 transition-transform duration-300">
                                {country.flag}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                            Политики устойчивого развития
                        </h1>
                        <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md">
                            Наши официальные документы и обязательства по устойчивому туризму
                        </p>
                    </div>
                </div>

                {/* CSS Animation */}
                <style>{`
          @keyframes floatFlag {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.7;
            }
            25% {
              transform: translate(30px, -40px) scale(1.1);
              opacity: 1;
            }
            50% {
              transform: translate(-20px, -60px) scale(0.9);
              opacity: 0.8;
            }
            75% {
              transform: translate(-30px, -20px) scale(1.05);
              opacity: 0.9;
            }
          }
          
          /* Document Content Styles mainly for the Mammoth output */
          .policy-content h1, .policy-content h2, .policy-content h3 {
             color: #1f2937;
             font-weight: 700;
             margin-top: 1.5rem;
             margin-bottom: 0.75rem;
          }
          .policy-content h1 { font-size: 1.8rem; }
          .policy-content h2 { font-size: 1.5rem; }
          .policy-content h3 { font-size: 1.25rem; }
          .policy-content p {
             margin-bottom: 1rem;
             line-height: 1.7;
             color: #374151;
          }
          .policy-content ul, .policy-content ol {
             margin-bottom: 1rem;
             padding-left: 1.5rem;
          }
          .policy-content ul { list-style-type: disc; }
          .policy-content ol { list-style-type: decimal; }
          .policy-content li { margin-bottom: 0.5rem; }
          .policy-content strong { color: #111827; }
        `}</style>
            </section>
            <div className="container-custom py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                Документы
                            </h2>
                            <ul className="space-y-2">
                                {policies.map((policy) => (
                                    <li key={policy.id}>
                                        <div
                                            className={`flex items-center justify-between p-3 rounded-md transition-colors group cursor-pointer ${selectedPolicyId === policy.id
                                                    ? 'bg-blue-50 ring-1 ring-blue-200'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => handleViewPolicy(policy)}
                                        >
                                            <div className="flex items-center text-gray-700 flex-grow">
                                                <FileText className={`w-5 h-5 mr-3 transition-colors ${selectedPolicyId === policy.id
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400 group-hover:text-blue-500'
                                                    }`} />
                                                <span className={`text-sm font-medium transition-colors ${selectedPolicyId === policy.id
                                                        ? 'text-blue-800'
                                                        : 'group-hover:text-blue-700'
                                                    }`}>
                                                    {policy.title}
                                                </span>
                                            </div>

                                            {selectedPolicyId === policy.id ? (
                                                <ChevronRight className="w-4 h-4 text-blue-500" />
                                            ) : (
                                                <a
                                                    href={policy.file}
                                                    download
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                    title="Скачать"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md p-8 min-h-[600px]">
                            {selectedPolicyId ? (
                                <div className="animate-fade-in">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-4 gap-4">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {policies.find(p => p.id === selectedPolicyId)?.title}
                                        </h2>
                                        <a
                                            href={policies.find(p => p.id === selectedPolicyId)?.file}
                                            download
                                            className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Скачать оригинал
                                        </a>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex flex-col justify-center items-center h-64 text-gray-500">
                                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                                            <p>Загрузка документа...</p>
                                        </div>
                                    ) : (
                                        <div
                                            className="policy-content"
                                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col h-full bg-white">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                        Библиотека политик
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                        В этом разделе представлены ключевые документы, регулирующие нашу деятельность в сфере устойчивого туризма.
                                        Мы придерживаемся высоких стандартов экологической ответственности, социальной справедливости и экономического процветания местных сообществ.
                                    </p>

                                    <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Как пользоваться библиотекой?</h3>
                                        <p className="text-blue-800 mb-4">
                                            Выберите интересующий вас документ в меню слева. Вы можете прочитать его прямо на сайте или скачать оригинал в формате Word.
                                        </p>
                                        <div className="flex items-center text-sm text-blue-700">
                                            <FileText className="w-4 h-4 mr-2" />
                                            <span>Все документы доступны на русском или английском языках</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-10 flex justify-center opacity-50">
                                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoliciesPage;
