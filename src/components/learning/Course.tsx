// src/components/learning/Course.tsx
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
  courseData: CourseData;
}

const Course: React.FC = () => {
  const location = useLocation();
  const { title } = useParams<{ title: string }>();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    // Get data from navigation state
    if (location.state && (location.state as LocationState).courseData) {
      setCourseData((location.state as LocationState).courseData);
      setLoading(false);
    } else {
      // If someone navigates directly to this URL without the state
      // We'll just show a message that the course couldn't be loaded
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

  const handleModules = () => {
    if (!courseData || !courseData.modules) return;
    
    // No need for API call since we already have the modules data
    // Just navigate to the modules page with the data we already have
    navigate(`/course/${courseData.title}/modules`, { 
      state: { 
        modulesData: courseData.modules,
        courseData: courseData // Pass the whole course data in case it's needed
      } 
    });
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
  if (!courseData) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4`} role="alert">
            <p>Course data not available. Please return to the learning path page and select a course.</p>
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
          className={`${theme === 'dark' ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-md'} rounded-lg overflow-hidden`}
          variants={itemVariants}
        >
          <div className={`px-6 py-5 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {courseData.title}
            </h1>
            <div className={`mt-2 flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className={`${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs font-medium px-2.5 py-0.5 rounded`}>
                Difficulty: {courseData.difficultyLevel}/10
              </span>
              <span className="ml-4">{new Date(courseData.createdAt).toLocaleDateString()}</span>
              
            </div>
          </div>
          
          <div className="p-6">
            <motion.div className="mb-6" variants={itemVariants}>
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                Course Description
              </h2>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {courseData.description}
              </p>
            </motion.div>
            
            {courseData.modules && courseData.modules.length > 0 && (
              <motion.div className="mb-6" variants={itemVariants}>
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Course Modules
                </h2>
                <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {courseData.modules.map((module, index) => (
                    <li key={module.id} className="mb-1">
                      <span className="font-medium">{module.title}</span>
                      {module.lessons && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({module.lessons.length} lessons)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            <motion.div 
              className="mt-6 flex space-x-4"
              variants={itemVariants}
            >
              <motion.button 
                className={`px-4 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={handleModules}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={!courseData.modules || courseData.modules.length === 0}
              >
                Start Learning
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Course;