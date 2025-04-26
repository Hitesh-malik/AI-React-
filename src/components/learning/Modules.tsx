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
  courseData?: CourseData;
}

const Modules: React.FC = () => {
  const location = useLocation();
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [modulesData, setModulesData] = useState<ModuleData[]>([]);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState;
      
      if (state.modulesData) {
        setModulesData(state.modulesData);
      }
      
      if (state.courseData) {
        setCourseData(state.courseData);
      }
      
      setLoading(false);
    } else {
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
    if (!moduleLessons || moduleLessons.length === 0) {
      setError("This module has no lessons available.");
      return;
    }
    
    navigate(`/course/${title}/modules/${moduleId}`, { 
      state: { 
        lessonData: moduleLessons,
        modulesData: modulesData,
        courseData: courseData
      },replace: true
    });
  };

  const navigateBackToCourse = () => {
    if (courseData) {
      navigate(`/course/${title}`, {
        state: { courseData },replace: true
      });
    } else {
      navigate(`/course/${title}`);
    }
  };

  const handleModuleHover = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  const handleModuleLeave = () => {
    setSelectedModule(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-64">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${theme === 'dark' ? 'border-purple-500' : 'border-blue-500'}`}></div>
            <p className={`mt-4 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading course modules...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!modulesData || modulesData.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-xl mx-auto rounded-lg p-8 ${theme === 'dark' ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
            <div className="flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className={`text-xl font-medium text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No Modules Available</h3>
            <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We couldn't find any modules for this course. Please return to the course page and try again.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={navigateBackToCourse}
                className={`px-5 py-2.5 rounded-md flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Return to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort modules by sequence order
  const sortedModules = [...modulesData].sort((a, b) => (a.sequenceOrder || 0) - (b.sequenceOrder || 0));

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course header */}
        <motion.div 
          className={`mb-10 pb-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          variants={itemVariants}
        >
          {/* <button 
            onClick={navigateBackToCourse}
            className={`inline-flex items-center mb-4 ${
              theme === 'dark' 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-blue-600 hover:text-blue-800'
            } transition-colors duration-200`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Course
          </button>
           */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h1>
              <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Course Modules
              </p>
            </div>
            
            {courseData && (
              <div className={`mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-sm`}>
                <div className="mr-4">
                  <div className={`text-xs uppercase font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Difficulty
                  </div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Level {courseData.difficultyLevel}/10
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Modules
                  </div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {modulesData.length} Total
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {error && (
          <motion.div 
            className={`mb-8 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded-r-md`} 
            role="alert"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <svg className="h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}
        
  
        
        {/* Modules grid */}
        <div className="mb-20">
          {sortedModules.map((module, index) => (
            <motion.div 
              key={module.id}
              className={`mb-8 ${index !== sortedModules.length - 1 ? 'relative' : ''}`}
              variants={itemVariants}
              onHoverStart={() => handleModuleHover(module.id)}
              onHoverEnd={handleModuleLeave}
            >
              {/* Module card */}
              <motion.div 
                className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 hover:border-purple-600/50' 
                    : 'bg-white border-gray-200 hover:border-blue-300'
                } rounded-xl shadow-lg overflow-hidden border-2 transition-colors duration-300`}
                variants={cardVariants}
                whileHover="hover"
                animate={{
                  borderColor: selectedModule === module.id 
                    ? theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(59, 130, 246, 0.5)' 
                    : theme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
                }}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    {/* Module sequence number */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-6 mb-4 sm:mb-0 ${
                      theme === 'dark' 
                        ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      <span className="text-xl font-bold">{module.sequenceOrder}</span>
                    </div>
                    
                    {/* Module content */}
                    <div className="flex-1">
                      <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
                        {module.title}
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6 text-base`}>
                        {module.description}
                      </p>
                      
                      {/* Lessons count */}
                      {module.lessons && (
                        <div className={`flex items-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="text-sm font-medium">
                            {module.lessons.length} {module.lessons.length === 1 ? 'Lesson' : 'Lessons'}
                          </span>
                        </div>
                      )}
                      
                      {/* Start button */}
                      <motion.button
                        onClick={() => handleStartModule(module.id, module.lessons)}
                        className={`px-6 py-3 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200 font-medium`}
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!module.lessons || module.lessons.length === 0}
                      >
                        Start This Module
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Connector line to next module */}
              {index !== sortedModules.length - 1 && (
                <div className="absolute left-6 sm:left-10 top-full h-8 w-0.5 bg-gradient-to-b from-gray-400 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Modules;