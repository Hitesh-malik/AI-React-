// src/components/learning/LearningPath.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';

interface CourseData {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  createdAt: string;
}

const LearningPath: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingPath, setCreatingPath] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

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
        navigate(`/course/${response.data.title}`, { 
          state: { courseData: response.data } 
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
    <motion.div 
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Your Learning Path
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Generate a personalized learning journey tailored to your interests and skill level.
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
          className={`${theme === 'dark' ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white shadow-md'} rounded-lg overflow-hidden`}
          variants={itemVariants}
        >
          <div className={`px-6 py-5 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create Your Learning Path
            </h2>
          </div>
          <div className="p-6">
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Tell us what you want to learn, and our AI will generate a complete course for you.
            </p>

            <motion.div className="mb-6" variants={itemVariants}>
              <label 
                htmlFor="subject" 
                className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}
              >
                What would you like to learn?
              </label>
              <textarea
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                placeholder="Ex: Introduction to machine learning with Python"
                rows={3}
                className={`w-full sm:w-2/3 px-3 py-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } rounded-md shadow-sm focus:outline-none`}
              />
            </motion.div>

            <motion.button
              onClick={generateLearningPath}
              disabled={creatingPath || !selectedSubject}
              className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                theme === 'dark' 
                  ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {creatingPath ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Course...
                </span>
              ) : (
                'Generate Learning Path'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LearningPath;