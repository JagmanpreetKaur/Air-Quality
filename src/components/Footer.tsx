import React from 'react';
import { Wind } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            EcoMonitor
          </span>
        </div>
        <p className="text-gray-400 mb-4">
          {t(
            'Ensuring environmental transparency and corporate accountability in Jamshedpur, Jharkhand.',
            'जमशेदपुर, झारखंड में पर्यावरणीय पारदर्शिता और कॉर्पोरेट जवाबदेही सुनिश्चित करना।'
          )}
        </p>
        <div className="text-gray-500 text-sm flex items-center justify-center space-x-2">
          <span>© 2025 EcoMonitor. {t('All rights reserved.', 'सभी अधिकार सुरक्षित।')}</span>
          <span>•</span>
          <span>{t('Last Updated', 'अंतिम अपडेट')} | NIT Jamshedpur</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
