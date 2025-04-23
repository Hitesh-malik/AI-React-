// src/components/learning/Lessons.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

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
      transition: { duration: 0.3 }
    }
  };

  const handleStartLearning = async (lessonId: string, lesson: Lesson) => {
    // Since we may not have the detailed lesson content yet,
    // we still need to make an API call to get the full lesson content
    try {
      setLoading(true);
      
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
        // Also pass along all lessons data for back navigation
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
      // If there's an error, still try to navigate with the basic lesson data
      navigate(`/course/${title}/modules/${moduleId}/lessons/${lessonId}`, {
        state: { 
          lesson,
          lessonData: lessonData,
          modulesData: modulesData
        }
      });
    } finally {
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
  if (!lessonData || lessonData.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4`} role="alert">
            <p>Lesson data not available. Please return to the modules page and try again.</p>
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-6" variants={itemVariants}>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Module Lessons
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Select a lesson to begin learning
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
          className="space-y-4"
          variants={containerVariants}
        >
          {lessonData.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
                } rounded-lg shadow-sm overflow-hidden border`}
              variants={itemVariants}
            >
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className={`text-xs font-medium ${theme === 'dark'
                      ? 'text-green-400'
                      : 'text-green-600'
                    }`}>
                    Lesson {index + 1}
                  </div>
                  <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {lesson.title}
                  </h2>
                </div>

                <button
                  onClick={() => handleStartLearning(lesson.id, lesson)}
                  className={`px-4 py-2 rounded-md text-white ${theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Start Learning'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Lessons;