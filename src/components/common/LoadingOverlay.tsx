// src/components/common/LoadingOverlay.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface LoadingOverlayProps {
  message?: string;
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message,
  isLoading 
}) => {
  const { theme } = useTheme();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Array of loading messages to cycle through
  const loadingMessages = [
    "Tutor is preparing your learning materials...",
    "Analyzing content for personalized learning...",
    "Optimizing content difficulty for you...",
    "Processing examples and explanations...",
    "Creating visual aids and diagrams...",
    "Organizing key concepts for your review...",
    "Preparing interactive exercises...",
    "Tailoring content to your learning style..."
  ];
  
  // If a custom message is provided, use it instead of the random ones
  const messagesToShow = message ? [message] : loadingMessages;
  
  // Change message every 3.5 seconds
  useEffect(() => {
    if (!isLoading) return;
    
    const intervalId = setInterval(() => {
      setCurrentMessageIndex(prevIndex => 
        (prevIndex + 1) % messagesToShow.length
      );
    }, 3500);
    
    return () => clearInterval(intervalId);
  }, [isLoading, messagesToShow.length]);
  
  if (!isLoading) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overlay background with proper opacity */}
      <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
        {/* Animated Robot/Tutor Icon */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-900/30 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 0 0px rgba(139, 92, 246, 0.3)",
                "0 0 0 20px rgba(139, 92, 246, 0)",
              ],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeOut"
            }}
          >
            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut" 
                }}
              />
              <motion.path 
                d="M9 22H15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.path 
                d="M12 16V22" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
              <motion.circle 
                cx="12" 
                cy="7" 
                r="1" 
                fill="currentColor"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </svg>
          </motion.div>
          
          {/* Animated particles - responsive based on screen size */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                backgroundColor: theme === 'dark' ? '#a855f7' : '#8b5cf6',
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: Math.cos(i * 60 * Math.PI / 180) * (window.innerWidth < 640 ? 40 : 50), 
                y: Math.sin(i * 60 * Math.PI / 180) * (window.innerWidth < 640 ? 40 : 50),
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Loading Text with message cycling animation */}
        <div className="h-16">
          <AnimatePresence mode="wait">
            <motion.h3 
              key={currentMessageIndex}
              className="text-lg sm:text-xl font-medium text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {messagesToShow[currentMessageIndex]}
            </motion.h3>
          </AnimatePresence>
        </div>
        
        {/* Loading dots */}
        <div className="flex space-x-2 mt-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{
                backgroundColor: theme === 'dark' ? '#a855f7' : '#8b5cf6',
              }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: dot * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Progress line - responsive width */}
        <motion.div 
          className="w-full max-w-xs sm:max-w-sm h-1 bg-gray-800 rounded-full mt-8 overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#e5e7eb',
          }}
        >
          <motion.div 
            className="h-full"
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(to right, #8b5cf6, #3b82f6)' 
                : 'linear-gradient(to right, #a855f7, #3b82f6)'
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        <motion.p 
          className="text-xs sm:text-sm mt-3"
          style={{
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AI tutor is customizing your learning experience
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;