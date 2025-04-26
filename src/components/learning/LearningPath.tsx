// src/components/learning/LearningPath.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';
import LoadingOverlay from '../common/LoadingOverlay';


interface ModuleData {
  id: string;
  title: string;
  description: string;
  sequenceOrder: number;
  lessons?: LessonData[];
}

interface LessonData {
  id: string;
  title: string;
  sequenceOrder: number;
  content?: string;
}

// Example subjects for inspiration section
const suggestedSubjects = [
  "Machine Learning Fundamentals",
  "Blockchain Technology",
  "Web Development with React",
  "backend Development with Node.js",
  "Mobile App Development with Flutter",
  "Data Science with Python",
  "Full stack JavaScript Development",
];

const LearningPath: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingPath, setCreatingPath] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);

  const navigate = useNavigate();

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

  const generateLearningPath = async () => {
    if (!selectedSubject) {
      setError('Please enter a subject to learn about');
      return;
    }

    try {
      setCreatingPath(true);
      setError(null);

      // Using the aiCourses API service method
      const response = await apiService.aiCourses.createCourse(selectedSubject);

      if (response.success && response.data) {
        // Store the entire course data including modules and lessons in state
        // This eliminates the need for additional API calls later
        navigate(`/course/${response.data.title}`, { 
          state: { courseData: response.data } , replace: true
        });
      } else {
        setError(response.error || 'Failed to generate learning path');
      }
    } catch (err) {
      console.error('Error generating learning path:', err);
      setError('Failed to generate learning path. Please try again.');
    } finally {
      setCreatingPath(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSelectedSubject(value);
    setCharCount(value.length);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSubject(suggestion);
    setCharCount(suggestion.length);
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

  return (
    <>
    <LoadingOverlay
      isLoading={creatingPath} 
    />
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
            Your AI Learning Path
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Describe what you want to learn, and our AI will design a personalized course just for you
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className={`max-w-3xl mx-auto mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4`} 
            role="alert"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        <motion.div 
          className={`max-w-3xl mx-auto ${theme === 'dark' ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-xl'} rounded-xl overflow-hidden`}
          variants={itemVariants}
        >
          <div className={`px-6 py-5 ${theme === 'dark' ? 'border-b border-gray-700 bg-gray-800/50' : 'border-b border-gray-200 bg-blue-50'}`}>
            <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create Your Learning Path
            </h2>
          </div>
          <div className="p-6">
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Tell us what you want to learn in detail, and our AI will generate a complete course tailored to your needs.
            </p>

            <motion.div className="mb-6" variants={itemVariants}>
              <label 
                htmlFor="subject" 
                className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}
              >
                What would you like to learn?
              </label>
              <div className="relative">
                <textarea
                  id="subject"
                  disabled={creatingPath}
                  value={selectedSubject}
                  onChange={handleTextareaChange}
                  placeholder="Ex: Introduction to machine learning with Python focused on neural networks and deep learning"
                  rows={4}
                  className={`w-full px-4 py-3 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md shadow-sm focus:outline-none text-base`}
                />
                <div className={`absolute bottom-2 right-2 text-xs ${
                  charCount > 0 ? (theme === 'dark' ? 'text-purple-400' : 'text-blue-500') : 'text-gray-400'
                }`}>
                  {charCount} characters
                </div>
              </div>
              
              {/* Character count or guidelines */}
              <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                The more specific you are, the better your course will be.
              </p>
            </motion.div>

            <motion.button
              onClick={generateLearningPath}
              disabled={creatingPath || !selectedSubject}
              className={`w-full px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                theme === 'dark' 
                  ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 shadow-md`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {creatingPath ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Personalized Course...
                </span>
              ) : (
                <>Generate My Learning Path</>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Suggested topics section */}
        <motion.div 
          className="max-w-3xl mx-auto mt-10"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Need inspiration? Try one of these topics:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {suggestedSubjects.map((subject, index) => (
              <motion.button
                key={index}
                disabled={creatingPath}
                onClick={() => handleSuggestionClick(subject)}
                className={`p-3 text-left rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                } shadow-sm transition`}
                variants={cardVariants}
                whileHover="hover"
              >
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {subject}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* How it works section */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={`text-xl font-semibold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-4 ${
                theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-100 text-blue-600'
              }`}>
                1
              </div>
              <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Describe Your Interest
              </h4>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Tell us what topic you want to learn about, with as much detail as possible.
              </p>
            </div>
            
            <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-4 ${
                theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-100 text-blue-600'
              }`}>
                2
              </div>
              <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                AI Generates Your Course
              </h4>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Our AI analyzes your request and creates a structured learning path with modules and lessons.
              </p>
            </div>
            
            <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-4 ${
                theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-100 text-blue-600'
              }`}>
                3
              </div>
              <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Start Learning
              </h4>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Begin your personalized learning journey with interactive lessons, quizzes, and examples.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </>
    
  );
};

export default LearningPath;