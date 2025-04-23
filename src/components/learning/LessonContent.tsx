// src/components/learning/LessonContent.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import ReactMarkdown from 'react-markdown';

interface Lesson {
  id: string;
  title: string;
  content: string;
  description?: string;
  simplifiedContent?: string;
  examples?: string;
  quiz?: Array<{
    id: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
  }>;
}

interface LocationState {
  lesson: Lesson;
}

const LessonContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, moduleId, lessonId } = useParams<{ title: string; moduleId: string; lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('content');
  const { theme } = useTheme();

  useEffect(() => {
    // Get lesson data from navigation state
    if (location.state && (location.state as LocationState).lesson) {
      setLesson((location.state as LocationState).lesson);
      setLoading(false);
    } else {
      // If someone navigates directly to this URL without the state
      // You could fetch the lesson data here
      setLoading(false);
    }
  }, [location.state]);

  const handleCompleteLesson = () => {
    // Here you would typically make an API call to mark the lesson as completed
    alert("Lesson completed! Great job!");
    navigate(`/course/${title}/modules/${moduleId}`);
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
            <button 
              onClick={() => navigate(`/course/${title}/modules/${moduleId}`)}
              className={`mt-2 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              Return to Modules
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
            onClick={() => navigate(`/course/${title}/modules/${moduleId}`)}
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

        {/* Lesson tabs */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('content')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? theme === 'dark' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-blue-500 text-blue-600'
                  : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lesson Content
            </button>
            {lesson.simplifiedContent && (
              <button
                onClick={() => setActiveTab('simplified')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'simplified'
                    ? theme === 'dark' 
                      ? 'border-purple-500 text-purple-400' 
                      : 'border-blue-500 text-blue-600'
                    : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Simplified Version
              </button>
            )}
            {lesson.examples && (
              <button
                onClick={() => setActiveTab('examples')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'examples'
                    ? theme === 'dark' 
                      ? 'border-purple-500 text-purple-400' 
                      : 'border-blue-500 text-blue-600'
                    : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Examples
              </button>
            )}
            {lesson.quiz && lesson.quiz.length > 0 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quiz'
                    ? theme === 'dark' 
                      ? 'border-purple-500 text-purple-400' 
                      : 'border-blue-500 text-blue-600'
                    : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Quiz
              </button>
            )}
          </nav>
        </div>

        {/* Lesson content */}
        <motion.div 
          className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-md overflow-hidden border`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'content' && (
            <div className="p-6">
              <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </div>
            </div>
          )}
          
          {activeTab === 'simplified' && lesson.simplifiedContent && (
            <div className="p-6">
              <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                <ReactMarkdown>{lesson.simplifiedContent}</ReactMarkdown>
              </div>
            </div>
          )}
          
          {activeTab === 'examples' && lesson.examples && (
            <div className="p-6">
              <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                <ReactMarkdown>{lesson.examples}</ReactMarkdown>
              </div>
            </div>
          )}
          
          {activeTab === 'quiz' && lesson.quiz && lesson.quiz.length > 0 && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Knowledge Check</h2>
              <div className="space-y-8">
                {lesson.quiz.map((question, index) => (
                  <div key={question.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                    <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Question {index + 1}: {question.questionText}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`${question.id}-${optIndex}`}
                            name={question.id}
                            className={`h-4 w-4 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'border-gray-300'} focus:ring-blue-500`}
                          />
                          <label 
                            htmlFor={`${question.id}-${optIndex}`} 
                            className={`ml-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <button 
                    className={`px-4 py-2 rounded-md text-white ${
                      theme === 'dark' 
                        ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    Submit Answers
                  </button>
                </div>
              </div>
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
            onClick={handleCompleteLesson}
            className={`px-6 py-3 rounded-md text-white flex items-center ${
              theme === 'dark' 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <span>Complete Lesson</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LessonContent;