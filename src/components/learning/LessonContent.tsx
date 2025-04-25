// src/components/learning/LessonContent.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { Lesson, QuizResult } from '../../types/LessonTypes';
import apiService from '../../api/apiService'; // Import the apiService

// Import modular components
import ContentSection from './ContentSection';
import QuizSection from './QuizSection';
import LessonTabs from './LessonTabs';

interface LocationState {
  lesson: Lesson;
  lessonData?: Lesson[]; // Added to store all lessons from previous page
  modulesData?: any; // Added to store modules data if available
}

const LessonContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, moduleId, lessonId } = useParams<{ title: string; moduleId: string; lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[] | null>(null);
  const [modulesData, setModulesData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('content');
  const [submitting, setSubmitting] = useState<boolean>(false); // New state for tracking API submission
  const { theme } = useTheme();
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null); // New state for error handling
  
  useEffect(() => {
    // Get data from navigation state
    if (location.state) {
      const state = location.state as LocationState;
      
      // Set the current lesson
      if (state.lesson) {
        setLesson(state.lesson);
      }
      
      // Store all lessons from previous page if available
      if (state.lessonData) {
        setAllLessons(state.lessonData);
      }
      
      // Store modules data if available
      if (state.modulesData) {
        setModulesData(state.modulesData);
      }
      
      setLoading(false);
    } else {
      // If someone navigates directly to this URL without the state
      // We should fetch the lesson data directly
      if (lessonId) {
        fetchLessonData(lessonId);
      } else {
        setLoading(false);
        setError('Lesson ID not found');
      }
    }
  }, [location.state, lessonId]);

  // Fetch lesson data if navigated directly to URL
  const fetchLessonData = async (id: string) => {
    try {
      const response = await apiService.aiCourses.getLessonsById(id);
      
      if (response.success && response.data) {
        setLesson(response.data);
      } else {
        setError(response.error || 'Failed to load lesson data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!lessonId) {
      setError('Lesson ID is missing');
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      // Ensure quiz score is properly accessed and log it for debugging
      const score = quizResult;
      console.log("Sending quiz score to API:", score);
      
      // Call the API to mark the lesson as complete, passing the quiz score if available
      const response = await apiService.aiCourses.completeLesson(
        lessonId,
        score
      );
      
      if (response.success) {
        // Show success message
        alert("Lesson completed successfully!");
        
        // Navigate back to lessons page with the data preserved
        navigateBackToLessons();
      } else {
        // Handle API error
        setError(response.error || 'Failed to mark lesson as complete');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Navigate back to lessons page with data
  const navigateBackToLessons = () => {
    // Navigate back to the lessons page with all the data preserved
    navigate(`/course/${title}/modules/${moduleId}`, {
      state: { 
        lessonData: allLessons, // Pass all lessons data back
        modulesData: modulesData // Pass modules data if available
      }
    });
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result.percentage);
    
    // Log the quiz result but don't submit yet - we'll submit when the user completes the lesson
    console.log("Quiz completed with score:", result);
  };

  // Generate available tabs based on lesson content
  const getAvailableTabs = () => {
    if (!lesson) return [];
    
    return [
      { id: 'content', label: 'Lesson Content', isAvailable: !!lesson.content },
      { id: 'simplified', label: 'Simplified Version', isAvailable: !!lesson.simplifiedContent },
      { id: 'examples', label: 'Examples', isAvailable: !!lesson.examples },
      { id: 'quiz', label: 'Quiz', isAvailable: !!lesson.quiz && lesson.quiz.length > 0 }
    ];
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
  if (!lesson) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} pt-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200' : 'bg-yellow-100 border-yellow-500 text-yellow-700'} border-l-4 p-4`} role="alert">
            <p>Lesson data not available. Please return to the modules page and try again.</p>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <button 
              onClick={navigateBackToLessons}
              className={`mt-2 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              Return to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button 
            onClick={navigateBackToLessons}
            className={`mb-4 flex items-center ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Lessons
          </button>
          
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</h1>
          
          {lesson.description && (
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lesson.description}</p>
          )}
        </div>

        {/* Display error message if any */}
        {error && (
          <div className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-200' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4`} role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Lesson tabs */}
        <LessonTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme}
          tabs={getAvailableTabs()}
        />

        {/* Lesson content */}
        <motion.div 
          className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-md overflow-hidden border`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'content' && lesson.content && (
            <ContentSection content={lesson.content} theme={theme} />
          )}
          
          {activeTab === 'simplified' && lesson.simplifiedContent && (
            <ContentSection content={lesson.simplifiedContent} theme={theme} />
          )}
          
          {activeTab === 'examples' && lesson.examples && (
            <ContentSection content={lesson.examples} theme={theme} />
          )}
          
          {activeTab === 'quiz' && lesson.quiz && lesson.quiz.length > 0 && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Knowledge Check
              </h2>
              <QuizSection 
                quiz={lesson.quiz} 
                theme={theme} 
                onQuizComplete={handleQuizComplete}
              />
            </div>
          )}
        </motion.div>

        {/* Complete lesson button */}

       <motion.div 
  className="mt-8 flex justify-end"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.5 }}
>
  <button 
    onClick={!lesson.completed ? handleCompleteLesson : undefined}
    disabled={submitting || lesson.completed}
    className={`px-6 py-3 rounded-md text-white flex items-center font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      lesson.completed || submitting
        ? 'opacity-70 cursor-not-allowed bg-green-600'
        : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
    }`}
  >
    {submitting ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
        <span>Submitting...</span>
      </>
    ) : (
      <>
        <span className="flex items-center">
          {lesson.completed ? "Completed" : "Complete Lesson"}
          {lesson.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </>
    )}
  </button>
</motion.div>

      </div>
    </motion.div>
  );
};

export default LessonContent;