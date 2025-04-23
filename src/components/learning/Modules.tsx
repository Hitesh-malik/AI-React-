// src/components/learning/Modules.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../api/apiService';

interface Module {
  id: string;
  title: string;
  description: string;
  sequenceOrder?: number;
}

interface LocationState {
  modulesData: Module[];
}

const Modules: React.FC = () => {
  const location = useLocation();
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Get data from navigation state
    if (location.state && (location.state as LocationState).modulesData) {
      setModulesData((location.state as LocationState).modulesData);
      setLoading(false);
    } else {
      // If someone navigates directly to this URL without the state
      setLoading(false);
    }
  }, [location.state]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  const handleStartModule = async (moduleId: string, moduleTitle: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the aiCourses API service method
      const response = await apiService.aiCourses.getLessons(moduleId);
      
      if (response.success && response.data) {
        navigate(`/course/${title}/modules/${moduleId}`, { 
          state: { lessonData: response.data }
        });
      } else {
        setError(response.error || 'Failed to fetch lessons');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-purple-500' : 'border-blue-500'}`}></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle case where we don't have data
  if (!modulesData || modulesData.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4`} role="alert">
            <p>Module data not available. Please return to the course page and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-6" variants={itemVariants}>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Course: {title}
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Select a module to begin learning
          </p>
        </motion.div>
        
        {error && (
          <motion.div 
            className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4`} 
            role="alert"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p>{error}</p>
          </motion.div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {modulesData.map((module, index) => (
            <motion.div 
              key={module.id} 
              className={`${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700/20' 
                  : 'bg-white border-gray-200 hover:shadow-lg'
              } rounded-lg shadow-md overflow-hidden border transition-shadow duration-300`}
              variants={cardVariants}
              whileHover="hover"
              transition={{ delay: index * 0.05 }}
            >
              <div className="p-6">
                {module.sequenceOrder && (
                  <div className="flex items-center mb-4">
                    <span className={`${
                      theme === 'dark' 
                        ? 'bg-blue-900/30 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    } text-xs font-medium rounded-full px-3 py-1`}>
                      Module {module.sequenceOrder}
                    </span>
                  </div>
                )}
                
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {module.title}
                </h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  {module.description}
                </p>
                
                <div className="mt-auto">
                  <motion.button
                    onClick={() => handleStartModule(module.id, module.title)}
                    className={`w-full px-4 py-2 rounded-md ${
                      theme === 'dark' 
                        ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Module
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Modules;