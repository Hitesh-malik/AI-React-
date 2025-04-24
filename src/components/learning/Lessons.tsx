// src/components/learning/Lessons.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import apiService from '../../api/apiService';

interface Lesson {
  id: string;
  title: string;
  content?: string;
  description?: string;
  simplifiedContent?: string;
  examples?: string;
  sequenceOrder: number;
  quiz?: Array<{
    id: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
  }>;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  sequenceOrder: number;
  lessons?: Lesson[];
}

interface LocationState {
  lessonData: Lesson[];
  modulesData?: ModuleData[]; // Store all modules data if available
}

const Lessons: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, moduleId } = useParams<{ title: string; moduleId: string }>();
  const [lessonData, setLessonData] = useState<Lesson[]>([]);
  const [modulesData, setModulesData] = useState<ModuleData[] | null>(null);
  const [currentModule, setCurrentModule] = useState<ModuleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const { theme } = useTheme();

  // Get the current module title
  useEffect(() => {
    if (modulesData) {
      const module = modulesData.find(m => m.id === moduleId);
      if (module) {
        setCurrentModule(module);
      }
    }
  }, [moduleId, modulesData]);

  useEffect(() => {
    // Get data from navigation state
    if (location.state) {
      const state = location.state as LocationState;

      if (state.lessonData) {
        // Sort lessons by sequence order if available
        const lessons = [...state.lessonData]
          .sort((a, b) => (a.sequenceOrder || 0) - (b.sequenceOrder || 0));

        setLessonData(lessons);
      }

      // Also store modules data if available for passing back
      if (state.modulesData) {
        setModulesData(state.modulesData);
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
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: theme === 'dark'
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: {
        y: { type: "spring", stiffness: 300, damping: 15 },
        boxShadow: { duration: 0.2 }
      }
    }
  };
  // Before your render function, combine the variants:
  const combinedVariants = {
    hidden: itemVariants.hidden,
    visible: itemVariants.visible,
    hover: cardHoverVariants.hover
  };

  const handleStartLearning = async (lessonId: string, lesson: Lesson) => {
    // Set the loading state for this specific lesson
    setLoadingLessonId(lessonId);

    try {
      // If the lesson already has content, we can navigate directly
      if (lesson.content) {
        navigate(`/course/${title}/modules/${moduleId}/lessons/${lessonId}`, {
          state: {
            lesson,
            lessonData: lessonData, // Pass all lessons data for back navigation
            modulesData: modulesData // Pass modules data if available
          }
        });
        return;
      }

      // Otherwise fetch the detailed lesson content
      const response = await apiService.aiCourses.getLessonsById(lessonId);

      if (response.success && response.data) {
        // Navigate to the lesson content page with the detailed lesson data
        navigate(`/course/${title}/modules/${moduleId}/lessons/${lessonId}`, {
          state: {
            lesson: response.data,
            lessonData: lessonData,
            modulesData: modulesData
          }
        });
      } else {
        // If API call fails, fall back to using the basic lesson data
        console.warn("Could not fetch detailed lesson data, using basic data:", response.error);
        navigate(`/course/${title}/modules/${moduleId}/lessons/${lessonId}`, {
          state: {
            lesson,
            lessonData: lessonData,
            modulesData: modulesData
          }
        });
      }
    } catch (error) {
      console.error("Error navigating to lesson:", error);
      setError("Failed to load lesson content. Please try again.");

      // If there's an error, still try to navigate with the basic lesson data
      navigate(`/course/${title}/modules/${moduleId}/lessons/${lessonId}`, {
        state: {
          lesson,
          lessonData: lessonData,
          modulesData: modulesData
        }
      });
    } finally {
      setLoadingLessonId(null);
    }
  };

  const togglePreview = (lessonId: string) => {
    if (activePreview === lessonId) {
      setActivePreview(null);
    } else {
      setActivePreview(lessonId);
    }
  };

  const handleBackToModules = () => {
    // Navigate back to modules page
    navigate(`/course/${title}/modules`, {
      state: {
        modulesData,
        courseTitle: title
      }
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
            className={`rounded-full h-16 w-16 border-t-4 border-b-4 ${theme === 'dark' ? 'border-purple-500' : 'border-blue-500'}`}
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
            Loading lessons...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Handle case where we don't have data
  if (!lessonData || lessonData.length === 0) {
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
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-medium">Lesson data not available.</p>
            </div>
            <p className="mb-3">Please return to the modules page and try again.</p>
            <motion.button
              className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-400'} text-white focus:outline-none transition-colors`}
              onClick={handleBackToModules}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Modules
            </motion.button>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center mb-2">
            <motion.button
              className={`mr-3 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'} focus:outline-none`}
              onClick={handleBackToModules}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {currentModule?.title || 'Module Lessons'}
            </h1>
          </div>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentModule?.description || 'Select a lesson to begin learning'}
          </p>

          {/* Module progress bar */}
          <div className="mt-4 relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-blue-200 text-blue-800'}`}>
                  Progress
                </span>
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                0/{lessonData.length} completed
              </div>
            </div>
            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500'}`}
                initial={{ width: '0%' }}
                animate={{ width: '0%' }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded`}
              role="alert"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
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
          className="space-y-6"
          variants={containerVariants}
        >
          {lessonData.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`${theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
                } rounded-xl shadow-md overflow-hidden border transition-all duration-200`}
              whileHover="hover"
              variants={combinedVariants}
            >
              <div className={`p-5 ${activePreview === lesson.id ? 'border-b border-gray-700' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                      <span className="text-lg font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${theme === 'dark'
                        ? 'text-purple-400'
                        : 'text-blue-600'
                        }`}>
                        Lesson {index + 1} of {lessonData.length}
                      </div>
                      <h2 className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {lesson.title}
                      </h2>
                      {lesson.description && (
                        <motion.button
                          className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} focus:outline-none flex items-center`}
                          onClick={() => togglePreview(lesson.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {activePreview === lesson.id ? 'Hide preview' : 'Show preview'}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-3 w-3 ml-1 transition-transform duration-300 ${activePreview === lesson.id ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartLearning(lesson.id, lesson)}
                    className={`px-4 py-2 rounded-lg ${loadingLessonId === lesson.id
                        ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                        : theme === 'dark'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                      } transition-colors duration-200`}
                    disabled={loadingLessonId === lesson.id}
                  >
                    {loadingLessonId === lesson.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Start Learning
                      </span>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {activePreview === lesson.id && lesson.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                        <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          About this lesson:
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lesson.description}
                        </p>

                        {lesson.quiz && lesson.quiz.length > 0 && (
                          <div className="mt-3">
                            <div className={`text-xs mt-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} flex items-center`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Includes quiz ({lesson.quiz.length} questions)
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

 
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          className={`mt-10 flex justify-between items-center px-4 py-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
          variants={itemVariants}
        >
          <motion.button
            className={`flex items-center px-4 py-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}
            onClick={handleBackToModules}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Modules
          </motion.button>

          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {lessonData.length} lessons in this module
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Lessons;