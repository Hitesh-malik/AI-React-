// src/components/contact/ContactInfo.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ContactInfo: React.FC = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        variants={itemVariants}
      >
        <div className={`px-6 py-5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'} border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Contact Information
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-purple-900/30 text-purple-400' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Email
                </h4>
                <a 
                  href="mailto:support@teluskotutor.ai" 
                  className={`text-base ${
                    theme === 'dark' 
                      ? 'text-white hover:text-purple-300' 
                      : 'text-gray-900 hover:text-purple-600'
                  } transition-colors`}
                >
                  support@teluskotutor.ai
                </a>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-purple-900/30 text-purple-400' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Phone
                </h4>
                <a 
                  href="tel:+91123456789" 
                  className={`text-base ${
                    theme === 'dark' 
                      ? 'text-white hover:text-purple-300' 
                      : 'text-gray-900 hover:text-purple-600'
                  } transition-colors`}
                >
                  +91 123 456 789
                </a>
              </div>
            </div>
            
            {/* Office */}
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-purple-900/30 text-purple-400' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Office
                </h4>
                <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  123 Tech Park, Electronic City<br />
                  Bangalore, Karnataka 560100<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Connect with us */}
      <motion.div 
        className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        variants={itemVariants}
      >
        <div className={`px-6 py-5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'} border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Connect With Us
          </h3>
        </div>
        
        <div className="p-6">
          <div className="flex space-x-4">
            {/* Twitter */}
            <a 
              href="https://twitter.com/teluskotutor" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300' 
                  : 'bg-gray-100 text-blue-500 hover:bg-blue-100 hover:text-blue-600'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/company/teluskotutor" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300' 
                  : 'bg-gray-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            
            {/* Facebook */}
            <a 
              href="https://facebook.com/teluskotutor" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300' 
                  : 'bg-gray-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://instagram.com/teluskotutor" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-pink-400 hover:bg-pink-900/30 hover:text-pink-300' 
                  : 'bg-gray-100 text-pink-600 hover:bg-pink-100 hover:text-pink-700'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;