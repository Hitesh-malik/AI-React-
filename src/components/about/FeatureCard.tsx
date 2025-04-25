// src/components/about/FeatureCard.tsx
import React, { JSX } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  theme: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, theme }) => {
  // Animation variants with custom delay based on index
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.15 * index 
      } 
    }
  };

  // Hover animation
  const hoverVariants = {
    hover: {
      y: -10,
      boxShadow: theme === 'dark' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        y: { type: "spring", stiffness: 300, damping: 15 },
        boxShadow: { duration: 0.2 }
      }
    },
    tap: {
      y: -5,
      boxShadow: theme === 'dark' 
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  // Icon animation
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.15 * index + 0.3,
        duration: 0.5,
        type: "spring", 
        stiffness: 200 
      } 
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, 0, -5, 0],
      transition: {
        scale: { duration: 0.2 },
        rotate: { 
          duration: 0.5, 
          repeat: Infinity, 
          repeatType: "loop" as const,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-800 shadow-lg border border-gray-700' 
          : 'bg-white shadow-md border border-gray-100'
      }`}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="p-6">
        <motion.div 
          className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${
            theme === 'dark' 
              ? 'bg-purple-900/40 text-purple-400' 
              : 'bg-blue-100 text-blue-600'
          }`}
          variants={iconVariants}
          whileHover="hover"
        >
          {feature.icon}
        </motion.div>
        
        <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {feature.title}
        </h3>
        
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {feature.description}
        </p>
      </div>
      
      <div className={`px-6 py-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
        <a 
          href={`#${feature.id}`} 
          className={`text-sm font-medium flex items-center ${
            theme === 'dark' 
              ? 'text-purple-400 hover:text-purple-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default FeatureCard;