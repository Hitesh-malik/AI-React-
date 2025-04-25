// src/components/learning/Course.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Simulate progress counting up on load
  useEffect(() => {
    if (courseData && !loading) {
      const timer = setTimeout(() => {
        const randomProgress = Math.floor(Math.random() * 30);
        setProgressPercent(randomProgress);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [courseData, loading]);

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
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${progressPercent}%`,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const toggleModule = (moduleId: string) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  const handleModules = () => {
    if (!courseData || !courseData.modules) return;
    
    // Add hover effect to button
    navigate(`/course/${courseData.title}/modules`, { 
      state: { 
        modulesData: courseData.modules,
        courseData: courseData // Pass the whole course data in case it's needed
      },
      replace: true 
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-16 flex items-center justify-center`}>
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${theme === 'dark' ? 'border-purple-500' : 'border-blue-500'}`}
            animate={{ 
              rotate: 360,
              transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.p 
            className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading course...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Handle case where we don't have data
  if (!courseData) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className={`${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4 rounded-md shadow-md`} 
            role="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-medium">Network issue back to the page</p>
            </div>
            <motion.div 
              className="mt-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.button 
                className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-400'} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
                onClick={() => navigate('/generatepath')}
                whileTap={{ scale: 0.98 }}
              >
                Return to Learning Paths
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-12`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {error && (
            <motion.div 
              className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded`} 
              role="alert"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className={`${theme === 'dark' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'bg-white shadow-xl'} rounded-lg overflow-hidden`}
          variants={itemVariants}
        >
          {/* Course Header with Background */}
          <div className={`px-6 py-8 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
            <motion.div 
              className="absolute inset-0 opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 1 }}
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '150px 150px' 
              }}
            />
            <div className="relative z-10">
              <motion.h1 
                className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {courseData.title}
              </motion.h1>
              <motion.div 
                className={`mt-3 flex flex-wrap items-center gap-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className={`${theme === 'dark' ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'} text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Difficulty: {courseData.difficultyLevel}/10
                </span>
                
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(courseData.createdAt).toLocaleDateString()}
                </span>
                
                
                {courseData.modules && (
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {courseData.modules.length} Modules
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          
          <div className="p-6">
            <motion.div className="mb-6" variants={itemVariants}>
              <div className="flex items-center mb-3">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Course Description
                </h2>
                 
              </div>
              <motion.p 
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {courseData.description}
              </motion.p>
            </motion.div>
            
            {courseData.modules && courseData.modules.length > 0 && (
              <motion.div className="mb-6" variants={itemVariants}>
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
                  Course Modules
                </h2>
                <div className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {courseData.modules.map((module, index) => (
                    <motion.div 
                      key={module.id}
                      className={`border ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} rounded-lg overflow-hidden`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ 
                        y: -2,
                        boxShadow: theme === 'dark' 
                          ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' 
                          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      <div 
                        className={`flex items-center justify-between p-4 cursor-pointer ${
                          expandedModule === module.id 
                            ? theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100' 
                            : ''
                        }`}
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center">
                          <div className={`mr-3 flex items-center justify-center w-8 h-8 rounded-full ${
                            theme === 'dark' ? 'bg-gray-700 text-purple-400' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{module.title}</span>
                          {module.lessons && (
                            <span className="ml-2 text-sm text-gray-500">
                              ({module.lessons.length} lessons)
                            </span>
                          )}
                        </div>
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                      
                      <AnimatePresence>
                        {expandedModule === module.id && module.lessons && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`px-4 pb-4 pt-1 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}
                          >
                            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {module.description}
                            </p>
                            {module.lessons.length > 0 && (
                              <ul className="space-y-2">
                                {module.lessons.map((lesson, idx) => (
                                  <motion.li 
                                    key={lesson.id}
                                    className={`flex items-center p-2 rounded ${
                                      theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * idx }}
                                    whileHover={{ x: 3 }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">{lesson.title}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="mt-8 flex space-x-4"
              variants={itemVariants}
            >
              <motion.button 
                className={`px-6 py-3 rounded-lg font-medium ${
                  theme === 'dark' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center`}
                onClick={handleModules}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={!courseData.modules || courseData.modules.length === 0}
                variants={pulseVariants}
                animate="pulse"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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