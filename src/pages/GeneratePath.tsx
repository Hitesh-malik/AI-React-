// src/pages/GeneratePath.tsx
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const GeneratePath: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`container mx-auto px-4 py-16 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
          Generate Your Learning Path
        </h1>
        
        <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-10`}>
          Create a personalized learning path tailored to your goals, interests, and skill level.
        </p>
        
        <div className={`max-w-xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-16`}>
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Generate with Telusko AI
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Use our powerful AI to create detailed learning paths with resource recommendations.
          </p>
          
          <motion.button 
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Coming Soon
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratePath;