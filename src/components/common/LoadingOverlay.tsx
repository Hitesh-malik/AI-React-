// src/components/common/LoadingOverlay.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface LoadingOverlayProps {
  message?: string;
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Tutor is preparing this module...", 
  isLoading 
}) => {
  const { theme } = useTheme();
  
  if (!isLoading) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Animated Robot/Tutor Icon */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative w-24 h-24 rounded-full bg-purple-900/30 flex items-center justify-center"
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
            <svg className="w-14 h-14 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          
          {/* Animated particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-500"
              style={{
                top: '50%',
                left: '50%',
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: Math.cos(i * 60 * Math.PI / 180) * 50, 
                y: Math.sin(i * 60 * Math.PI / 180) * 50,
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
        
        {/* Loading Text */}
        <motion.h3 
          className="text-xl font-medium text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.h3>
        
        {/* Loading dots */}
        <div className="flex space-x-2 mt-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-purple-400 rounded-full"
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
        
        {/* Progress line */}
        <motion.div 
          className="w-64 h-1 bg-gray-800 rounded-full mt-8 overflow-hidden"
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        <motion.p 
          className="text-sm text-gray-400 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Analyzing content for personalized learning
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;