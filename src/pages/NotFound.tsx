// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const NotFound: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="text-center p-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl font-bold text-purple-600 mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;