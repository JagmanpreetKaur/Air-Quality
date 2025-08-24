import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('Page Not Found', 'पृष्ठ नहीं मिला')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t(
              "The page you're looking for doesn't exist or has been moved.",
              'आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।'
            )}
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          {t('Return to Home', 'मुख्य पृष्ठ पर वापस जाएं')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
