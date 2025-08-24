/// <reference lib="dom" />
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Droplets, Mountain, Zap, Search, BarChart3, AlertTriangle, FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const toxinCategories = [
  {
    id: 'air',
    title: 'Air Pollution',
    hindiTitle: 'वायु प्रदूषण',
    description: 'Monitor industrial air emissions, PM2.5, NO₂, SO₂, and AQI levels from manufacturing facilities in Jamshedpur.',
    hindiDescription: 'जमशेदपुर में विनिर्माण सुविधाओं से औद्योगिक वायु उत्सर्जन, PM2.5, NO₂, SO₂, और AQI स्तर की निगरानी करें।',
    icon: Wind,
    color: 'from-blue-500 to-cyan-500',
    companies: 14,
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  }
];

const quickActions = [
  {
    title: 'View Analytics',
    hindiTitle: 'विश्लेषण देखें',
    description: 'Comprehensive environmental data analysis',
    hindiDescription: 'व्यापक पर्यावरणीय डेटा विश्लेषण',
    icon: BarChart3,
    link: '/analytics',
    color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
  },
  {
    title: 'Active Alerts',
    hindiTitle: 'सक्रिय अलर्ट',
    description: 'View companies with pollution violations',
    hindiDescription: 'प्रदूषण उल्लंघन वाली कंपनियों को देखें',
    icon: AlertTriangle,
    link: '/alerts',
    color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
  },
  {
    title: 'Generate Reports',
    hindiTitle: 'रिपोर्ट जेनरेट करें',
    description: 'Download environmental compliance reports',
    hindiDescription: 'पर्यावरणीय अनुपालन रिपोर्ट डाउनलोड करें',
    icon: FileText,
    link: '/analytics',
    color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
  }
];

const Index = () => {
  const { t, language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Update timer for live data simulation
    const updateTimer = () => {
      const seconds = Math.floor(Math.random() * 60) + 1;
      setLastUpdated(t(`${seconds}s ago`, `${seconds} सेकंड पहले`));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 5000);

    return () => clearInterval(interval);
  }, [t]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('Environmental', 'पर्यावरण')}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t(' Monitoring', ' निगरानी')}
            </span>
            <br />
            {t('Dashboard', 'डैशबोर्ड')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t(
              'Real-time pollution monitoring and compliance tracking for industrial facilities in Jamshedpur, Jharkhand. Ensuring environmental transparency and accountability.',
              'जमशेदपुर, झारखंड में औद्योगिक सुविधाओं के लिए वास्तविक समय प्रदूषण निगरानी और अनुपालन ट्रैकिंग। पर्यावरणीय पारदर्शिता और जवाबदेही सुनिश्चित करना।'
            )}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">14</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Air Pollution Companies', 'वायु प्रदूषण कंपनियां')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">1</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Critical Alerts', 'गंभीर अलर्ट')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">67%</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Avg Compliance', 'औसत अनुपालन')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">42+</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Air Quality Sensors', 'वायु गुणवत्ता सेंसर')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Toxin Categories - Minimal spacing */}
      <section className="py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Air Pollution Monitoring', 'वायु प्रदूषण निगरानी')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t(
                'Monitor real-time air quality data from industrial facilities across Jamshedpur, Jharkhand.',
                'जमशेदपुर, झारखंड में औद्योगिक सुविधाओं से वास्तविक समय वायु गुणवत्ता डेटा की निगरानी करें।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {toxinCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/${category.id}/companies`}
                  className="group block"
                >
                  <Card className={`${category.bgPattern} dark:bg-gray-800/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 dark:opacity-5">
                      <IconComponent className="w-full h-full" />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {language === 'hi' ? category.hindiTitle : category.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {category.companies} {t('companies', 'कंपनियां')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'hi' ? category.hindiDescription : category.description}
                      </p>
                      <div className="mt-6">
                        <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
                          {t('View Companies', 'कंपनियों को देखें')}
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Quick Actions', 'त्वरित कार्य')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('Access key environmental monitoring tools and reports', 'मुख्य पर्यावरणीय निगरानी उपकरण और रिपोर्ट तक पहुंचें')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.link}
                  className="group block"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {language === 'hi' ? action.hindiTitle : action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === 'hi' ? action.hindiDescription : action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
