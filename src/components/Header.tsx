import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import SearchModal from '@/components/SearchModal';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                EcoMonitor
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{t('Search Companies', 'कंपनियों की खोज करें')}</span>
              </Button>
              
              <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
              
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 justify-start"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('Search Companies', 'कंपनियों की खोज करें')}</span>
                </Button>
                
                <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
                
                <LanguageSelector 
                  currentLanguage={language} 
                  onLanguageChange={setLanguage} 
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
