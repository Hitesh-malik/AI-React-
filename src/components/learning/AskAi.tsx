// src/components/learning/AskAi.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';
import LoadingOverlay from '../common/LoadingOverlay';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ApiResponse {
  answer: string;
  sources: string[];
}

// Example subjects for inspiration section
const suggestedSubjects = [
  "Machine Learning Fundamentals",
  "Blockchain Technology",
  "Web Development with React",
  "backend Development with Node.js",
  "Data Science with Python",
  "Full stack JavaScript Development",
];

const AskAi: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingPath, setCreatingPath] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [showResponse, setShowResponse] = useState<boolean>(false);

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

  const responseVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.5 }
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
      const response = await apiService.aiCourses.askAi(selectedSubject);

      if (response.success && response.data) {
        console.log(response.data, 'ai response');
        setResponse(response.data);
        setShowResponse(true);
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

  const renderResponse = () => {
    if (!response) return null;

    return (
      <motion.div
        className={`max-w-3xl mx-auto mt-6 ${theme === 'dark' ? 'bg-gray-800 shadow-lg border border-gray-700' : 'bg-white border border-gray-200'} rounded-xl overflow-hidden`}
        variants={responseVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              AI Response
            </h3>
            <button
              onClick={() => setShowResponse(!showResponse)}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {showResponse ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {showResponse && (
            <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={theme === 'dark' ? tomorrow : prism}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {response.answer}
              </ReactMarkdown>
              
              {/* {response.sources && response.sources.length > 0 && (
                <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sources:</p>
                  <ul className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {response.sources.map((source, index) => (
                      <li key={index} className="mb-1">
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          )}
        </div>
      </motion.div>
    );
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
      <LoadingOverlay isLoading={creatingPath} />
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
              Describe what you want to Ask, and our AI will response you.
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
            className={`max-w-3xl mx-auto ${theme === 'dark' ? 'bg-gray-800 shadow-lg border border-gray-700' :  'bg-violet-100 text-violet-600'} rounded-xl overflow-hidden`}
            variants={itemVariants}
          >
            <div className="p-6">
              <motion.div className="mb-6" variants={itemVariants}>
                <div className="relative">
                  <textarea
                    id="subject"
                    disabled={creatingPath}
                    value={selectedSubject}
                    onChange={handleTextareaChange}
                    placeholder="What would you like to Ask?"
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
                
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  The more specific you are, the better your response will be.
                </p>
              </motion.div>

              <motion.button
                onClick={generateLearningPath}
                disabled={creatingPath || !selectedSubject}
                className={`w-full px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  theme === 'dark' 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
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
                    Creating Your Response...
                  </span>
                ) : (
                  <>Submit</>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Response Section */}
          {response && renderResponse()}
          
          {/* Suggested topics section */}
        </div>
      </motion.div>
    </>
  );
};

export default AskAi;