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
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.15 * i
      } 
    }),
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      custom={index}
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="p-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          theme === 'dark' 
            ? 'bg-purple-900/30 text-purple-400' 
            : 'bg-purple-100 text-purple-600'
        }`}>
          {React.cloneElement(feature.icon, { className: "h-6 w-6" })}
        </div>
        <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {feature.title}
        </h3>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {feature.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-700/20">
          <motion.div
            className={`inline-flex items-center text-sm font-medium ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Learn more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;