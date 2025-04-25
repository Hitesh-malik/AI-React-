// src/components/about/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 }
    }
  };

  return (
    <motion.section 
      className={`relative overflow-hidden py-20 md:py-32 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px' 
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-12">
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              variants={itemVariants}
            >
              <span className={`${theme === 'dark' ? 'text-purple-400' : 'text-blue-600'}`}>Telusko Tutor AI</span>
              <br />
              <span>Revolutionizing Personalized Learning</span>
            </motion.h1>
            
            <motion.p 
              className={`text-lg md:text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              variants={itemVariants}
            >
              Telusko Tutor AI combines advanced artificial intelligence with expert educational content to create a truly personalized learning experience that adapts to your unique needs.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <a 
                href="#features" 
                className={`px-6 py-3 rounded-lg text-white font-medium ${
                  theme === 'dark' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } shadow-lg transition-all duration-200 inline-flex items-center`}
              >
                Explore Features
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 md:mt-0 md:w-1/2"
            variants={imageVariants}
          >
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Placeholder for AI Tutor visualization */}
              <div className="aspect-w-16 aspect-h-9">
                <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-32 w-32 ${theme === 'dark' ? 'text-purple-500' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${theme === 'dark' ? 'bg-gradient-to-t from-gray-900 to-transparent' : 'bg-gradient-to-t from-white to-transparent'}`}>
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>
                  Interactive AI Learning Assistant
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  Responds to your questions in real-time
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;