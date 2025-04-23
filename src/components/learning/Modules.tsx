// src/components/learning/Modules.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface LessonData {
  id: string;
  title: string;
  sequenceOrder: number;
  content?: string;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  sequenceOrder: number;
  lessons?: LessonData[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  difficultyLevel: string | number;
  createdAt: string;
  aiGenerated?: boolean;
  modules?: ModuleData[];
}

interface LocationState {
  modulesData: ModuleData[];
  courseData?: CourseData; // Store complete course data
}

const Modules: React.FC = () => {
  const location = useLocation();
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [modulesData, setModulesData] = useState<ModuleData[]>([]);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Get data from navigation state
    if (location.state) {
      const state = location.state as LocationState;
      
      if (state.modulesData) {
        setModulesData(state.modulesData);
      }
      
      // Store course data if available
      if (state.courseData) {
        setCourseData(state.courseData);
      }
      
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

  const handleStartModule = (moduleId: string, moduleLessons: LessonData[] | undefined) => {
    // Check if we have lessons data
    if (!moduleLessons || moduleLessons.length === 0) {
      setError("This module has no lessons available.");
      return;
    }
    
    // Navigate to the lessons page with all data needed
    // This includes the lessons for this module and all modules data for back navigation
    navigate(`/course/${title}/modules/${moduleId}`, { 
      state: { 
        lessonData: moduleLessons,
        modulesData: modulesData, // Pass all modules data for back navigation
        courseData: courseData    // Pass course data if available for complete data chain
      } 
    });
  };

  // Function to navigate back to course page with data
  const navigateBackToCourse = () => {
    if (courseData) {
      navigate(`/course/${title}`, {
        state: { courseData }
      });
    } else {
      navigate(`/course/${title}`);
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
            <button 
              onClick={navigateBackToCourse}
              className={`mt-2 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              Return to Course
            </button>
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
          <div className="flex flex-col mb-2">
            <button 
              onClick={navigateBackToCourse}
              className={`flex items-center mr-4 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Course
            </button>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Course: {title}
            </h1>
          </div>
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
          {/* Sort modules by sequence order */}
          {[...modulesData]
            .sort((a, b) => (a.sequenceOrder || 0) - (b.sequenceOrder || 0))
            .map((module, index) => (
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
                  {module.sequenceOrder !== undefined && (
                    <div className="flex items-center mb-4">
                      <span className={`${
                        theme === 'dark' 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-100 text-blue-800'
                      } text-xs font-medium rounded-full px-3 py-1`}>
                        Module {module.sequenceOrder}
                      </span>
                      {module.lessons && (
                        <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {module.lessons.length} Lessons
                        </span>
                      )}
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
                      onClick={() => handleStartModule(module.id, module.lessons)}
                      className={`w-full px-4 py-2 rounded-md ${
                        theme === 'dark' 
                          ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!module.lessons || module.lessons.length === 0}
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